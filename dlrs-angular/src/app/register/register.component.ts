import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../login/alert.service'
import { LoginService } from '../services/login.service'
import { UserService } from '../services/user.service';
import { IUserRequest } from '../model/userrequest'
import { NotificationService } from '../services/notification.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    registerFormJson: JSON;
    userCreate: IUserRequest = new IUserRequest();
    
    constructor(
        private notificationService: NotificationService,
        private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.loginService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.min(6000000000)]],
            address: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password').value;
  let confirmPass = group.get('confirmPass').value;

  return pass === confirmPass ? null : { notSame: true }     
}
    onSubmit() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            this.alertService.error("invalid data");

            return;
        }

        this.userCreate = this.registerForm.value;
        this.userCreate.role = "User";
        this.loading = true;

        console.log(this.userCreate);


        this.userService.register(this.userCreate)
            .subscribe(
                data => {
                    this.notificationService.showSuccess("User Created Successfully,Proceed to Login",
                        "Success");
                        this.loading=false;
                        this.gotoLogin();

                },
                error => {
                    if(error.status==400){
                        this.notificationService.showInfo("User Already Exists","User Info");
                    }else{
                    this.notificationService.showError("Invalid Details, User not Created!!", "Error");
                    }      
                    this.gotoLogin();
                    this.loading=false;
                });
                
    }
    gotoLogin() {
        this.router.navigate(['/home']);
      }
}