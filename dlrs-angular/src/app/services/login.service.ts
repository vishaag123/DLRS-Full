import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { GlobalConstants } from '../common/global-constants';
import { IUserResponse } from '../model/userresponse';



@Injectable({ providedIn: 'root' })
export class LoginService {
    private currentUserSubject: BehaviorSubject<IUserResponse>;
    public currentUser: Observable<IUserResponse>;
    private url: string;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<IUserResponse>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.url = GlobalConstants.testURL+'user/validateuser';
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        const body = new HttpParams()
            .set('email', email)
            .set('password', password);
        return this.http.post<any>(this.url, body)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                   // console.log("Received token"+user.token+"User object        "+user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out.
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}