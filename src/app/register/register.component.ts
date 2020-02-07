import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public errMsg:string="";

  constructor(private authservice: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: [''],
      password: [''],
      email: [''],
      contact: [],
      balance: [],
      
    });
  }

  public get name()  {
    return this.registerForm.controls.name;
  }

  public get password()  {
    return this.registerForm.controls.password;
  }

  public get email()  {
    return this.registerForm.controls.email;
  }

  public get contact()  {
    return this.registerForm.controls.contact;
  }
  public get balance()  {
    return this.registerForm.controls.balance;
  }
  

  onSubmit() 
  {
    const name: string = this.registerForm.get('name').value;
    const password: string = this.registerForm.get('password').value;
    const email: string = this.registerForm.get('email').value;
    const contact: string = this.registerForm.get('contact').value;
    const balance: Number = this.registerForm.get('balance').value;
    
    this.authservice.register(name,password,contact,email,balance).subscribe(
      user => {
        this.router.navigate(['']);
      },
      error => {
        this.errMsg=error.error.message;
      }
    );
  }

  login()
  {
    this.router.navigate(['']);
  }

}