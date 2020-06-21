import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot} from '@angular/router';
import { LoginService } from '../services/login.service';
import { IUserResponse } from '../model/userresponse';
import { IUserRequest } from '../model/userrequest';
import { GlobalConstants } from './global-constants';

@Injectable()
export class RoleGuardService implements CanActivate {
    currentUser:IUserResponse;
    constructor(public login: LoginService, public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.expectedRole;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        // decode the token to get its payload
        if(!this.currentUser){
            this.router.navigate(['home']);
        }else if(this.currentUser.role===expectedRole){
            return true;
        }else{
            if(this.currentUser.role===GlobalConstants.LOGIN_BY_NORMAL_USER)
            this.router.navigate(['userDashboard']);
            if(this.currentUser.role===GlobalConstants.LOGIN_BY_ADMIN)
            this.router.navigate(['adminDashboard']);
        }
        
    }
}