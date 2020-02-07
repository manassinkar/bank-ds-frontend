import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['',Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      password: ['', [Validators.required, Validators.minLength(3)]]
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
  

  onSubmit() 
  {
    const name: string = this.registerForm.get('name').value;
    const password: string = this.registerForm.get('password').value;
    const email: string = this.registerForm.get('email').value;
    const contact: string = this.registerForm.get('contact').value;
    console.log('Test')
    this.authservice.register(name,password,contact,email).subscribe(
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