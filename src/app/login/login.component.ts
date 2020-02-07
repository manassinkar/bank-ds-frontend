import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errMsg:string="";

  constructor(private authservice: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  public get email()  {
    return this.loginForm.controls.email;
  }

  public get password()  {
    return this.loginForm.controls.password;
  }

  onSubmit() 
  {
    const email: string = this.loginForm.get('email').value;
    const password: string = this.loginForm.get('password').value;
    this.authservice.login(email,password).subscribe(
      user => {
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.errMsg=error.error.message;
      }
    );
  }

  register()
  {
    this.router.navigate(['/register']);
  }

}