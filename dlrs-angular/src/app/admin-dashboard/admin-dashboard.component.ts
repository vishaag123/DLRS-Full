import { Component, OnInit } from '@angular/core';
import { IUserResponse } from '../model/userresponse';
import {ViewtestComponent} from '../viewtest/viewtest.component';
import {CreateTestComponent} from '../create-test/create-test.component';
import { ViewappadminComponent } from '../viewappadmin/viewappadmin.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  // delclaration
  dummyComponent;
  currentPage;
  isDisplay=false;  
  hideInnerContainer:boolean=false;
  isBackDisplay=true;
  currentUser:IUserResponse;
  dashboardtextstyle;
  hideContainer=true;

  constructor(private router:Router) {
    this.currentPage="Admin Dashboard";
   }
  
  ngOnInit(): void {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
  }

  //load components in to container
  loadDashboardComponent(x:number):void{

    switch(x){
      case 1:
        this.dummyComponent=ViewtestComponent;
        this.currentPage="List of Tests";
        break;
      case 2:
        this.dummyComponent=CreateTestComponent;
        this.currentPage="Create Test";
        break;
        case 3:
          this.dummyComponent=ViewappadminComponent;
          this.currentPage="User Appointments";
          break;

    }
    this.hideInnerContainer=true;
    this.isDisplay=!this.isDisplay;
    this.isBackDisplay=!this.isBackDisplay;
    this.dashboardtextstyle='h1-change';
    
    this.hideContainer=false;
  }

  // Handle back button click and headings
  back(){
    this.hideInnerContainer=false;
    this.dashboardtextstyle="";
    this.isDisplay=false;
    this.isBackDisplay=true;
    this.currentPage="User Dashboard";
    this.hideContainer=true;
  }

  //clearData is removes the local storage data
  clearData(){
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
