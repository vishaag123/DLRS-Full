import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { ViewtestComponent } from './viewtest/viewtest.component';
import { ViewappuserComponent } from './viewappuser/viewappuser.component';
import { ViewappadminComponent } from './viewappadmin/viewappadmin.component';
import { RegisterComponent } from './register/register.component';
import { CreateappointmentComponent } from './createappointment/createappointment.component';
import { RoleGuardService } from './common/role-guard.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { GlobalConstants } from './common/global-constants';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: 'userDashboard',
    component: UserDashboardComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: GlobalConstants.LOGIN_BY_NORMAL_USER,
    },
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: GlobalConstants.LOGIN_BY_ADMIN,
    },
  },
  { path: 'checkout',component:CheckoutComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'viewUserAppointments', component: ViewappadminComponent },
  { path: 'registerComponent', component: RegisterComponent },
  { path: 'about', component:AboutComponent,pathMatch:'full'},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'createTest', component: CreateTestComponent },
  { path: 'viewtest', component: ViewtestComponent },
  { path: 'viewAppointment', component: ViewappuserComponent },
  { path: 'appointment', component: CreateappointmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
