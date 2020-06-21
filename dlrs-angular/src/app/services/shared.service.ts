import { Injectable } from '@angular/core';
import { Test } from '../model/test';
import {Subject, Observable} from 'rxjs';

@Injectable()
export class SharedService{
    userAppDetails:Subject<any>=new Subject<any>();
    selectedTests:Subject<Test[]>=new Subject<Test[]>();
    

    setTestList(tests:Test[]){
      this.selectedTests.next(tests);
    }

    getTestList():Observable<Test[]>{
      return this.selectedTests.asObservable();
    }
  
    constructor(){}

    setUserData(val: object){
      this.userAppDetails.next(val);
    }

    getUserData():Observable<any>{
      return this.userAppDetails.asObservable();
    }
    
  
}