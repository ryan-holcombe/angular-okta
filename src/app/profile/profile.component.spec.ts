import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {RouterTestingModule} from '@angular/router/testing';
import {OktaAuthModule, OktaAuthService} from '@okta/okta-angular';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../user.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OktaAuthModule.initAuth({
          issuer: `http://fake.url/oauth2/fake`,
          redirectUri: `http://fake.url/implicit/callback`,
          clientId: 'clientId'}),
        RouterTestingModule.withRoutes(
          [{path: '', component: ProfileComponent}]
        ),
        HttpClientTestingModule,
      ],
      declarations: [ ProfileComponent ],
      providers: [OktaAuthService, UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
