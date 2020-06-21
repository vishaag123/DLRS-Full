import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { HttpClient } from '@angular/common/http';
import { AppointmentResponse } from '../model/appointmentresponse';
import { Observable } from 'rxjs';
import { UserAppointment } from '../model/appointmentmaster';
import { AppointmentCreate } from '../model/appointment.create';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  //declarations


  private BaseUrl=GlobalConstants.testURL;
  constructor(private httpClient:HttpClient) { }

  //post to create appointment
  createAppointment(appointmentReq:AppointmentCreate){
    return this.httpClient.post(this.BaseUrl+'appointment/'+appointmentReq.userId+'/user/create-appointment',appointmentReq);
  }
  //get All appointments
getAllAppointments():Observable<AppointmentResponse[]>{
   return this.httpClient.get<AppointmentResponse[]>(this.BaseUrl+'appointment/getAll');

  }

  //get Master data for user appointment
  getAppointmentDataByUserId(userId:number):Observable<UserAppointment>{
    return this.httpClient.get<UserAppointment>(this.BaseUrl+'appointment/'+userId+'/user/all-appointments-for-user');
  }

  //get Master data for all users
  getAppointmentMaster():Observable<any[]>{
    return this.httpClient.get<any[]>(this.BaseUrl+'appointment/all-appointments');
  }

}
