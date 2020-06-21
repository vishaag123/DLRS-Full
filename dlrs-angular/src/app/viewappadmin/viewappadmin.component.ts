import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { TestService } from '../services/test.service';
import { AppointmentResponse } from '../model/appointmentresponse';
import { UserAppointment, TestDetail } from '../model/appointmentmaster';
import { SharedService } from '../services/shared.service';

import { ReportService } from '../services/report.service';
import { NotificationService } from '../services/notification.service';
import { element } from 'protractor';
import { AppointmentDetail } from '../model/appointment.create';

@Component({
  selector: 'app-viewappadmin',
  templateUrl: './viewappadmin.component.html',
  styleUrls: ['./viewappadmin.component.css'],
  providers: [SharedService]
})

export class ViewappadminComponent implements OnInit {


  constructor(private appointmentService: AppointmentService,
    private testService: TestService,
    private reportService:ReportService,
    private notificationService:NotificationService,
    private sharedService: SharedService) { 
      this.appointmentService.getAppointmentMaster().subscribe(data=>{
        data.forEach(user=>{
          if(user.appointmentDetails!=='undefined' && user.appointmentDetails.length>0){
           
            this.userAppointments.push(user);
            
          }
        })
    });
    }

    // Handling file upload function
  currentUserAppointment: UserAppointment;
  currentAppointmentTests: TestDetail[] = [];
  selectedFile: File = null;


  appointmentList: AppointmentDetail[] = [];
  userAppointments: UserAppointment[] = [];
  // UI Components
  dummyComponent;
  hideContainer = true;
  loading = false;
  submitted = false;
  ngOnInit(): void {
    
    this.getAppointments();

  }


  //another way to get details
  getAppointments(){
  
  }

  uploadReport(appointment: UserAppointment) {

    this.currentUserAppointment=appointment;
    this.currentAppointmentTests=this.currentUserAppointment.appointmentDetails[0].testDetails;
    this.hideContainer = !this.hideContainer;
    
  }

  onFileSelected(event){
    this.selectedFile=<File>event.target.files[0];
    
  }
  uploadReportToServer(){
    this.loading=true;
      const fd=new FormData;
      fd.append('userId',String(this.currentUserAppointment.userId));
      fd.append('appointmentId',String(this.currentUserAppointment.appointmentDetails[0].appointmentId))
      fd.append('result',this.selectedFile,this.selectedFile.name);

      this.reportService.uploadReport(fd).subscribe(
        data=>{
          this.notificationService.showSuccess("Report Uploaded Successfully","Upload Success");
          this.loading=false;
        },error=>{
          if(error.status==400){
            this.notificationService.showInfo("Report Already Uploaded","Upload Failed");
            this.loading=false;
          }else{
          this.notificationService.showError("Report Upload Failed","Error!");
          this.loading=false;
          }
        }
        
      );
  }

}
