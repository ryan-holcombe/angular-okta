#!/usr/bin/groovy

podTemplate(label: 'jenkins-pipeline', containers: [
    containerTemplate(name: 'jnlp', image: 'lachlanevenson/jnlp-slave:3.10-1-alpine', args: '${computer.jnlpmac} ${computer.name}', workingDir: '/home/jenkins', resourceRequestCpu: '50m'),
    containerTemplate(name: 'docker', image: 'gcr.io/kaniko-project/executor:debug', command: 'cat', ttyEnabled: true, resourceRequestCpu: '50m'),
    containerTemplate(name: 'node', image: 'mattlewis92/docker-nodejs-chrome:master', command: 'cat', ttyEnabled: true, resourceRequestCpu: '50m'),
    containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:v2.9.1', command: 'cat', ttyEnabled: true, resourceRequestCpu: '50m'),
],
volumes:[
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
    secretVolume(secretName: 'docker-config', mountPath: '/root/.docker'),
]){

  node ('jenkins-pipeline') {

    def pwd = pwd()
    def chart_dir = "${pwd}/charts/angular-okta"
    def go_dir = "github.com/sythe21/angular-okta"

    git 'https://github.com/sythe21/angular-okta.git'

    // read in required jenkins workflow config values
    def config = readYaml file: 'Jenkinsfile.yml'
    println "pipeline config ==> ${config}"

    container('node') {

        stage('install ng') {
            sh "npm install -g @angular/cli"
        }

        stage('npm install') {
            sh "npm install"
        }

        stage('ng unit tests') {
            sh "ng test --watch=false --no-progress"
        }

        stage('ng e2e tests') {
            sh "ng e2e"
        }
    }

    container('docker') {
        sh "apk update && apk add make git"

        def releaseTag = sh(returnStdout: true, script: "git describe --tags --always --dirty").trim()
        def tags = [releaseTag, "latest"]
        def kanikoTagFmt = []
        for (String tag: tags) {
          kanikoTagFmt.add("-d rholcombe/angular-okta:$tag ")
        } 

        stage ('docker build and push') {
          sh """
            /kaniko/executor -f `pwd`/Dockerfile -c `pwd` --insecure-skip-tls-verify $kanikoTagFmt
          """
        }
    }

    container('helm') {
        stage ('helm verify') {
            sh """
            helm lint ${chart_dir}
            helm upgrade --dry-run --install --force ${config.name} ${chart_dir} --namespace=default --values jenkins-deploy.yml
            """
        }
        stage ('helm install') {
            println "Running deployment"
            sh "helm upgrade --install --force ${config.name} ${chart_dir} --namespace=default --values jenkins-deploy.yml --wait"
            println "Application ${config.name} successfully deployed"
        }
    }
  }
}

