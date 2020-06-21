import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { Test } from '../model/test';
import { IAppointmentTest } from '../model/appointmenttest';
import { IUserResponse } from '../model/userresponse';
import { AppointmentCreate, TestDetail, AppointmentDetail } from '../model/appointment.create';
import { AppointmentService } from '../services/appointment.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-createappointment',
  templateUrl: './createappointment.component.html',
  styleUrls: ['./createappointment.component.css'],
  providers:[SharedService]
})
export class CreateappointmentComponent implements OnInit {
  
  tests: Test[];
  page=1;
  pageSize=10;
  totalCost=0;
  appointmentCreate: AppointmentCreate = new AppointmentCreate();
  errorMessage: string;
  currentUser:IUserResponse;
  appointmenttest: IAppointmentTest = new IAppointmentTest();
  selectedTest:Test[]=[];
  testList:TestDetail[]=[];
  // To handle the minimum date
  currentDate:Date;
  currentDateString:String;
  // end

  appointmentDetail:AppointmentDetail=new AppointmentDetail();
  appointmentRequest:AppointmentCreate=new AppointmentCreate();

    constructor(private testService: TestService
      ,private sharedService:SharedService
      ,private appointmentService:AppointmentService,
      private notificationService:NotificationService,private router: Router
      ) { }

  ngOnInit(): void {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    this.testService.getAllTests().subscribe(
      data =>  this.tests=data,
      error => this.errorMessage=error
    )
    // this.currentDateString=new Date().toString();
   
  }

  addToList(test:Test){
    if(this.selectedTest.includes(test)){
      this.selectedTest.splice(this.selectedTest.indexOf(test), 1);
      this.totalCost=this.totalCost-test.cost;
    }else{
    this.selectedTest.push(test);
    this.totalCost+=test.cost;
  }
}
  validate():boolean{
    if((<HTMLInputElement>document.getElementById("appointmentDateTime")).value===""){
      this.notificationService.showError("Please Select Date","Date Error");
      return false;
    } 
    //  if((<HTMLInputElement>document.getElementById("appointmentDateTime")).value<this.currentDateString){
    //   this.notificationService.showError("Please select appropriate Date","Date Error");
    //   return false;
    // } 
    else if(this.selectedTest.length==0){
      this.notificationService.showError("Please Select Test","Test Error");
      return false;}

      else return true;
    }
  
  save() {
     if(this.validate()){ 
    //this.obj.userId=this.currentUser.id;
    this.selectedTest.forEach(test=>{

          this.testList.push({id:test.id});
    });
    this.appointmentRequest.userId=this.currentUser.id;
    // push data to appointment detail object
    this.appointmentDetail.amount=this.totalCost;
    this.appointmentDetail.date=(<HTMLInputElement>document.getElementById("appointmentDateTime")).value;
    
    this.appointmentDetail.testDetails=this.testList;
    this.appointmentRequest.appointmentDetails=[];
    this.appointmentRequest.appointmentDetails.push(this.appointmentDetail);
  
    this.appointmentService.createAppointment(this.appointmentRequest)
    .subscribe(
      data=>{
          console.log(data);
          this.gotoHome();
          this.notificationService.showSuccess("Appointment Created Successfully","Appointment Created");
          
      },error=>{
        this.notificationService.showError("Appointment Creation Failed","Error");
      }
    )

    
     }
  }

  onSubmit() {
    

    this.save();
  }

  gotoHome() {
    
    this.router.navigate(['/userDashboard']);
  }
}