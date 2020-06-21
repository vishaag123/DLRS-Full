import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { TestCreate } from '../model/testcreate';
import { IAlert } from '../model/alert';
import { NotificationService } from '../services/notification.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})

export class CreateTestComponent implements OnInit {
  createTestForm:FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private testService: TestService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  testObj: TestCreate = new TestCreate();
  t1:TestCreate=new TestCreate();
  ngOnInit(): void {
    this.createTestForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      cost: ['', [Validators.required, Validators.min(0)]],
  });
  }
  alert: IAlert;
   // convenience getter for easy access to form fields
   get f() { return this.createTestForm.controls; }

  createTest() {
    console.log("Inside createTest")
    this.submitted = true;

        // stop here if form is invalid
        if (this.createTestForm.invalid) {
           

            return;
        }
    this.testObj=this.createTestForm.value;
    
    
    this.testService.createTest(this.testObj).subscribe(
      data => {
        this.notificationService.showSuccess("Test Created Successfully",
          "Success");
      },
      error => {
        if(error.status==400){
          this.notificationService.showInfo("Test Already Exists","Test Info");
      }else{
        this.notificationService.showError("Not able to create Test", "Error");
      }}


    );
  }

}
