import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { AlertService } from './alert.service';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import {IUserResponse} from '../model/userresponse';
import { NotificationService } from '../services/notification.service';
import { GlobalConstants } from '../common/global-constants';



@Component({templateUrl: 'login.component.html',  styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private notificationService:NotificationService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: LoginService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/userDashboard';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    userDetails:IUserResponse;
    onSubmit() {
        localStorage.clear();
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.userDetails=data;
                    if(data==null){
                        this.notificationService.showError("Invalid Login credentials or Email not verified","Login Error");
                    this.loading = false;
                        console.log("error")
                    }else{
                        if(this.userDetails.role===GlobalConstants.LOGIN_BY_NORMAL_USER)
                        this.router.navigate([GlobalConstants.USERDASHBOARD_COMPONENT]);
                        else if(this.userDetails.role===GlobalConstants.LOGIN_BY_ADMIN)
                        this.router.navigate([GlobalConstants.ADMINDASHBOARD_COMPONENT]);
                    console.log("Success"+this.returnUrl);
                    }
                    
                },
                error => {
                    if(error.status=403){
                            this.notificationService.showError("Invalid Login credentials or Email not verified","Login Error");
                    };
                    
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
