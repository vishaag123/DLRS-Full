import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { HttpClient } from '@angular/common/http';
import { AppointmentDetail, UserAppointment } from '../model/appointmentmaster';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private BaseUrl=GlobalConstants.testURL;
  currentUser:User;
  constructor(private httpClient:HttpClient) {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
   }


   createPayment(appDeatil:UserAppointment){
     let paymentreq={
        "amount":appDeatil.appointmentDetails[0].amount,
        "type":"credit"
     }
     return this.httpClient.post(this.BaseUrl+'payment/'+appDeatil.userId+'/user/'+appDeatil.appointmentDetails[0].appointmentId+'/appointment/pay-for-appointment',paymentreq);
   }
}
