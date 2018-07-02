import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {OktaAuthModule, OktaAuthService} from '@okta/okta-angular';
import {UserService} from '../user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let authService: OktaAuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OktaAuthModule.initAuth({
          issuer: `http://fake.url/oauth2/fake`,
          redirectUri: `http://fake.url/implicit/callback`,
          clientId: 'clientId'}),
        RouterTestingModule.withRoutes(
          [{path: '', component: ListComponent}]
        ),
        HttpClientTestingModule,
      ],
      declarations: [ ListComponent ],
      providers: [OktaAuthService, UserService]
    })
      .compileComponents();
  }));

  beforeEach(async( () => {
    authService = TestBed.get(OktaAuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
