import { Component, OnInit } from '@angular/core';
import { TestService} from '../services/test.service';
import {Test} from '../model/test';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-viewtest',
  templateUrl: './viewtest.component.html',
  styleUrls: ['./viewtest.component.css']
})
export class ViewtestComponent implements OnInit {
  
  
  testList:Test[]=[];
  page=1;
  pageSize=10;
  constructor(private testService:TestService) { 
   
  
    
  }
  
  ngOnInit(): void {
      
    this.testService.getAllTests()
    .subscribe( data=>{
      this.testList=data;
      
    }    );

    
  }

 


}
