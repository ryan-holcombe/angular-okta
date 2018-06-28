import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {OktaAuthModule} from '@okta/okta-angular';
import {HomeComponent} from './home/home.component';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {UserService} from './user.service';
import {OktaConfig} from '@okta/okta-angular/dist/okta/models/okta.config';
import { ProfileComponent } from './profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

const config: OktaConfig = {
  issuer: 'https://dev-638248.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:8000/implicit/callback',
  clientId: environment.clientId,
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    ProfileComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule.initAuth(config)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
