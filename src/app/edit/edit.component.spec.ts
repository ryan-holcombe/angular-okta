import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {RouterTestingModule} from '@angular/router/testing';
import {OktaAuthModule, OktaAuthService} from '@okta/okta-angular';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../user.service';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OktaAuthModule.initAuth({
          issuer: `http://fake.url/oauth2/fake`,
          redirectUri: `http://fake.url/implicit/callback`,
          clientId: 'clientId'}),
        RouterTestingModule.withRoutes(
          [{path: '', component: EditComponent}]
        ),
        HttpClientTestingModule,
      ],
      declarations: [ EditComponent ],
      providers: [OktaAuthService, UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
