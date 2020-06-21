import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import {TestService} from '../services/test.service';
import {LoginComponent}  from '../login/login.component';
import { CommonModule } from '@angular/common';  
import { GlobalConstants} from 'src/app/common/global-constants';
import { BrowserModule } from '@angular/platform-browser';
import {Router} from '@angular/router';
import {TestCreate} from '../model/testcreate';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public report;
  
  hideInnerContainer:boolean=false;
  private testCreateObj:TestCreate;
  constructor(private repService:ReportService,private testService:TestService,private router:Router) { 
 
  }
  dummyComponent;
  ngOnInit(): void {
    localStorage.clear();
  }

  // Load login component in the ngComponentoutlet
  loadLoginComponent():void{
      this.dummyComponent=LoginComponent;
      this.hideInnerContainer=true;
  }
  // Load Register component in the ngComponentoutlet
  loadRegisterComponent():void{
    this.dummyComponent=RegisterComponent;
    this.hideInnerContainer=true;
  }

 loadAboutComponent(){
	this.router.navigate([GlobalConstants.ABOUT_COMPONENT]);
}


}
