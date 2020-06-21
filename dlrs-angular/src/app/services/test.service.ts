import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { GlobalConstants } from "../common/global-constants";
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Test } from '../model/test';
import {ReportService} from './report.service';
import { IAppointmentTestResponse } from '../model/appointmenttestresponse';
import { IAppointmentTest } from '../model/appointmenttest';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { TestCreate } from '../model/testcreate';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  repService:ReportService;
  testService:TestService;
  
  private BaseUrl=GlobalConstants.testURL;
  constructor(private httpClient:HttpClient) {
  
  }
   
  

  //service to create tests
  createTest(testObj:TestCreate){
    return this.httpClient.post(this.BaseUrl+'test/createTest',testObj);
    
  }

  


  //get list of all the tests, handle call using subscribe
  getAllTests():Observable<Test[]>{
    return  this.httpClient.get<Test[]>(this.BaseUrl+'test/allTests');
  }

  //get tests by test id, handle call using subscribe
  getTestById(testId:number):Observable<Test>{
    return this.httpClient.get<Test>(this.BaseUrl+'test/'+testId).pipe(
      tap(data=>JSON.stringify(data)),
      catchError(this.handleError)
    );
  }
  
  // function to get testId associated with the appointment, call getTestByAppointmentId() first to get the testlist with details of each test
  getTestListByAppointmentId(appointmentId:number):Observable<IAppointmentTestResponse[]>{
    return this.httpClient.get<IAppointmentTestResponse[]>(this.BaseUrl+'appointment/getTests/'+appointmentId).pipe(
       tap(data=>JSON.stringify(data)),
       catchError(this.handleError)
     )
  }

  //response containing only the 
  private appointmentResponse:Array<IAppointmentTestResponse>=[];
  
  //final variable containing all the test details for a particular appointment
  private appointmentTests:IAppointmentTest=new IAppointmentTest;
  //get tests along with each test details by appointment 
  async getTestByAppointmentId(appointmentId: number) {
    console.log('appointment id:  '+appointmentId);
    await this.getTestListByAppointmentId(appointmentId)
      .subscribe(data => {
        this.appointmentResponse = data;
        console.log(this.appointmentResponse);
        this.appointmentTests.appointmentId = data[0].appointmentId;
        this.appointmentTests.userId = data[0].userId;
        this.appointmentTests.name = data[0].name;
        this.appointmentTests.date = data[0].date;
        let i = 0;
        let testList: Test[] = [];
        data.forEach(element => {
          this.getTestById(element.testId)
            .subscribe(data => {
              
              testList[i] = (data);
              i++;
            });


        });
        
        this.appointmentTests.testList = testList
      });


    return this.appointmentTests;
  }

 

  //get test by user id



  
  public handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
