import {RouterModule, Routes} from '@angular/router';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {ProfileComponent} from './profile/profile.component';

const appRoutes: Routes = [
  { path : '', component : HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ OktaAuthGuard ], },
  { path: 'add', component: AddComponent, canActivate: [ OktaAuthGuard ], },
  { path: 'list', component: ListComponent, canActivate: [ OktaAuthGuard ], },
  { path: 'edit', component: EditComponent, canActivate: [ OktaAuthGuard ], },
  { path: 'implicit/callback', component: OktaCallbackComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
