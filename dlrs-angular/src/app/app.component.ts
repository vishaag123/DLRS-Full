import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {CreateTestComponent} from './create-test/create-test.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}
  title = 'dlrs-angular';

  ngOnInit(){} 

}
