import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { IReport } from '../model/reportresponse';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { GlobalConstants } from "../common/global-constants";



@Injectable({
  providedIn: 'root'
})


export class ReportService {

  
  private reportUrl = GlobalConstants.testURL+'reports'; 
  constructor(private httpClient:HttpClient) { }

  //upload report
  uploadReport(fd:FormData){
    
    return this.httpClient.post(this.reportUrl+"/uploadReport",fd).pipe(
      tap(data=>console.log(data))
    )
  }


  //service to get report by id
  getReportById(id: number): Observable<IReport>{
    return this.httpClient.get<IReport>(this.reportUrl+'/'+id);
    
  }


  //service  to get report by appointment id
  getReportByUserId(userId: number): Observable<IReport>{
    return this.httpClient.get<IReport>(this.reportUrl+'/user/'+userId).pipe(
      tap(data =>JSON.stringify(data)),
      catchError(this.handleError)
    )
  }

  //service to get report by user Id
  getReportByAppointmentId(appId:number):Observable<IReport>{
    console.log("Iside function");
    return this.httpClient.get<IReport>(this.reportUrl+'/appointment/'+appId).pipe(
      tap(data =>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

    
    

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
