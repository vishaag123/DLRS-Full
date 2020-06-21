import { Component, OnInit } from '@angular/core';
import {IUserResponse} from '../model/userresponse';
import { ViewappuserComponent } from '../viewappuser/viewappuser.component';
import { CreateTestComponent } from '../create-test/create-test.component';
import { ViewtestComponent } from '../viewtest/viewtest.component';
import { Router } from '@angular/router';
import { CreateappointmentComponent } from '../createappointment/createappointment.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  dummyComponent;
  currentPage;
  isDisplay=false;  
  isBackDisplay=true;
  currentUser:IUserResponse;
  hideInnerContainer:boolean=false;
  dashboardtextstyle;
  hideContainer=true;
  
  constructor(private router:Router) { 
    this.currentPage="User Dashboard";
  }

  ngOnInit(): void {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    this.dashboardtextstyle="";
  }
  //load data into container
  loadDashboardComponent(x:number):void{

    switch(x){
      case 1:
        this.dummyComponent=ViewtestComponent;
        this.currentPage="List of Tests";
        break;
      case 2:
        this.dummyComponent=CreateappointmentComponent;
        this.currentPage="Create Appointment";
        break;
        case 3:
          this.dummyComponent=ViewappuserComponent;
          this.currentPage="Appointment Details";
          break;

    }
    this.hideInnerContainer=true;
    this.isDisplay=!this.isDisplay;
    this.isBackDisplay=!this.isBackDisplay;
    this.dashboardtextstyle='h1-change';
    this.hideContainer=false;
  }


  back(){
    this.hideInnerContainer=false;
    this.dashboardtextstyle="";
    this.isDisplay=false;
    this.isBackDisplay=true;
    this.currentPage="User Dashboard";
    this.hideContainer=true;
  }

  removeData(){
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
