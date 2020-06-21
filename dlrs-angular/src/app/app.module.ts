import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTestComponent } from './create-test/create-test.component';
import { ViewtestComponent } from './viewtest/viewtest.component';
import { CreateappointmentComponent } from './createappointment/createappointment.component';
import { ViewappuserComponent } from './viewappuser/viewappuser.component';
import { ViewappadminComponent } from './viewappadmin/viewappadmin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RoleGuardService } from './common/role-guard.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    HomeComponent,
    LoginComponent,
    CreateTestComponent,
    ViewtestComponent,
    CreateappointmentComponent,
    ViewappuserComponent,
    ViewappadminComponent,
    RegisterComponent,
    CheckoutComponent,
    AboutComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ToastrModule.forRoot(),
    CommonModule,
  ],
  exports: [FormsModule],
  providers: [RoleGuardService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
