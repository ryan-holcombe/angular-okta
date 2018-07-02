import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import {RouterTestingModule} from '@angular/router/testing';
import {OktaAuthModule, OktaAuthService} from '@okta/okta-angular';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../user.service';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OktaAuthModule.initAuth({
          issuer: `http://fake.url/oauth2/fake`,
          redirectUri: `http://fake.url/implicit/callback`,
          clientId: 'clientId'}),
        RouterTestingModule.withRoutes(
          [{path: '', component: AddComponent}]
        ),
        HttpClientTestingModule,
      ],
      declarations: [ AddComponent ],
      providers: [OktaAuthService, UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
