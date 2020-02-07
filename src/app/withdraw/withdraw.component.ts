import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  public withdrawForm: FormGroup;
  public errMsg:string="";
  public user: any;

  constructor(private authservice: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.withdrawForm = this.fb.group({
      amount: []
      
    });
    this.getUser();
  }
  public get amount()  {
    return this.withdrawForm.controls.amount;
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
    this.errMsg = '';
    const amount: Number = this.withdrawForm.get('amount').value;
    this.authservice.withdraw(amount).subscribe(
      user => {
        this.ngOnInit();
      },
      error => {
        this.errMsg=error.error.message;
      }
    );
  }


}
