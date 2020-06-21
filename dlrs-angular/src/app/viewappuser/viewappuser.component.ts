import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { TestService } from '../services/test.service';
import { IAppointmentTest } from '../model/appointmenttest';
import { Test } from '../model/test';
import { ReportService } from '../services/report.service';
import { IReport } from '../model/reportresponse';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { AppointmentService } from '../services/appointment.service';
import { UserAppointment, TestDetail } from '../model/appointmentmaster';
import { IUserResponse } from '../model/userresponse';
import { GlobalConstants } from '../common/global-constants';
import { Router } from '@angular/router';



@Component({
  selector: 'app-viewappuser',
  templateUrl: './viewappuser.component.html',
  styleUrls: ['./viewappuser.component.css']
})

export class ViewappuserComponent implements OnInit {

  constructor(private testService: TestService, private reportService: ReportService
    , private sanitizer: DomSanitizer,
    private router:Router
    , private appointmentService: AppointmentService) { }
  currentUser: IUserResponse;


  currentUserAppointment: UserAppointment;
  currentAppointmentTests: TestDetail[] = [];
  currentAppointmentReport: IReport = new IReport();
  reportImage: any;
  reportURL: string;
  showAppointment:boolean=false;
  showNoAppointment:boolean=true;



  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
   appointmentId:number;
  appointmentStatus:string;
  currentAppointmentId;
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


    this.appointmentService.getAppointmentDataByUserId(this.currentUser.id).subscribe
      (
        data => {
         
          this.currentUserAppointment = data;
          if(this.currentUserAppointment.appointmentDetails[0]!=null){
            this.showAppointment=true;
            this.showNoAppointment=false;
          }
          this.currentAppointmentTests = this.currentUserAppointment.appointmentDetails[0].testDetails;
          this.appointmentId=this.currentUserAppointment.appointmentDetails[0].appointmentId;
          this.appointmentStatus=this.currentUserAppointment.appointmentDetails[0].status;
         

        }
      );

  }
  dummyComponent;

  async getReportDetails() {
    await this.reportService.getReportByAppointmentId(this.appointmentId).subscribe(data => {
      this.currentAppointmentReport = data;

      //  this.createImageFromBlob(this.currentAppointmentReport.result);
      this.retrieveResonse = this.currentAppointmentReport.result;

      // Below is to show the image
      // this.reportImage='data:image/jpeg;base64,'+this.retrieveResonse;

      //handle pdf
      var byteArray = this.base64ToArrayBuffer(this.retrieveResonse);
      let blob: any = new Blob([byteArray], { type: 'application/octet-stream' });
      saveAs(blob, this.currentAppointmentReport.userId + "" + this.currentAppointmentReport.appointmentId + "report.pdf", true);



    });
  }


  showReport(){
    if(this.appointmentStatus===GlobalConstants.REPORTGENERATED){
      return true;
    }else{
      return false;
    }
  }

  showPayment(){
    if(this.appointmentStatus===GlobalConstants.NOTPAID){
      return true;}
      else return false;
    }
  

  base64ToArrayBuffer(base64: any): ArrayBuffer {

    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }


  createImageFromBlob(image: Blob) {

    var i = new Blob([image], { type: 'Image/png' })
    let reader = new FileReader();
    this.reportImage = saveAs(i, 'image.png');
  }

  makePayment(){
    console.log(this.currentUserAppointment);
    localStorage.setItem('currentAppDetail',JSON.stringify(this.currentUserAppointment));
    this.router.navigate(['/checkout']);
  }

}
