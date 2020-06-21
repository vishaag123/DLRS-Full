import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  currentUser;
  
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {

    this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
  }

  clearData(){
    localStorage.removeItem('currentUser');
    this.router.navigate([GlobalConstants.HOME_COMPONENT]);
  }
}
