import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {OktaCallbackComponent} from '@okta/okta-angular';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
      ],
      declarations: [
        AppComponent,
        HomeComponent,
        ListComponent,
        AddComponent,
        EditComponent,
        ProfileComponent,
        OktaCallbackComponent
      ],
      providers: [
        {
          provide: APP_BASE_HREF, useValue : '/'
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
