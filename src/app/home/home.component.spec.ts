import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {OktaAuthModule, OktaAuthService} from '@okta/okta-angular';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from '../app.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: OktaAuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OktaAuthModule.initAuth({
        issuer: `http://fake.url/oauth2/fake`,
        redirectUri: `http://fake.url/implicit/callback`,
        clientId: 'clientId'
      }),
      RouterTestingModule.withRoutes(
        [{path: '', component: HomeComponent}]
      )],
      declarations: [ HomeComponent ],
      providers: [OktaAuthService]
    })
    .compileComponents();
  }));

  beforeEach(async( () => {
    authService = TestBed.get(OktaAuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
