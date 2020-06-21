import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUserRequest } from '../model/userrequest';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    private BaseUrl=GlobalConstants.testURL;
    register(user: IUserRequest) {
      
        return this.http.post(this.BaseUrl+'user/saveuser', user);
    }
/*
    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }*/
}