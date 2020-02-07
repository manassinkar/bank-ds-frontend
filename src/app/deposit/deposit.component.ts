import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  public depositForm: FormGroup;
  public errMsg:string="";
  public user: any;
  constructor(private authservice: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.depositForm = this.fb.group({
      amount: []
      
    });
    this.getUser();
  }
  public get amount()  {
    return this.depositForm.controls.amount;
  }
  getUser()
  {
    this.authservice.viewProfile().subscribe(
        user=>
        {
          this.user = user;
        },
        error=>
        {
          this.errMsg=error.error.message;
        }
    )
  }
  onSubmit() 
  {
    const amount: Number = this.depositForm.get('amount').value;
    this.authservice.deposit(amount).subscribe(
      user => {
        this.ngOnInit();
      },
      error => {
        this.errMsg=error.error.message;
      }
    );
  }

}
