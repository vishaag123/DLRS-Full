import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { NotificationService } from '../services/notification.service';
import { AppointmentDetail, TestDetail } from '../model/appointmentmaster';
import { AppointmentService } from '../services/appointment.service';
import { UserAppointment } from '../model/appointmentmaster';
import { PaymentService } from '../services/payment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
providers:[SharedService]
})
export class CheckoutComponent implements OnInit {
  appointmentDetail:UserAppointment;
  selectedTests:TestDetail[]=[];
  currentUser;
  currentPage="Payment";
  submitted = false;
  paymentForm:FormGroup;
  
  constructor(private sharedService:SharedService,
    private notificationService:NotificationService,
    private paymentService:PaymentService,
    private router:Router,
    private formBuilder:FormBuilder,
    private appointmentService:AppointmentService) {}
  ngOnInit(): void {

    


   //this.selectedTests=JSON.parse(localStorage.getItem('selTests'));
   this.appointmentDetail=JSON.parse(localStorage.getItem('currentAppDetail'));
   this.selectedTests=this.appointmentDetail.appointmentDetails[0].testDetails;
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    
    // payment group for validation
    this.paymentForm = this.formBuilder.group({
      pMethod:['',[Validators.required]],
      pName: ['', [Validators.required]],
      pNumber: ['', [Validators.required,Validators.minLength(16)]],
      pExpire:['',[Validators.required]],
      pCVV:['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]]
  });
      
  }


  // convenience getter for easy access to form fields
  get f() { return this.paymentForm.controls; }

  clearData(){
    localStorage.removeItem('currentUser');
  }
  uploadData(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.paymentForm.invalid) {
           
            console.log("Invalid");
            return;
        }
     this.paymentService.createPayment(this.appointmentDetail).subscribe(data=>{
       this.notificationService.showSuccess('Payment Successful',"Payment");
       this.router.navigate(['/userDashboard']);
     });
  }
  // Handle back button click
  back(){
    this.router.navigate(['/userDashboard']);
  }
}
