import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  isLoginMode = true;
  authForm: FormGroup;

  ngOnInit(): void {
    this.initAuthForm();
  }



  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  initAuthForm () {
    this.authForm = new FormGroup({
      email: new FormControl('test'),
      password: new FormControl('test')
    })
  }

  captureForm () {
    console.log('data :' +  this.authForm.value.email, this.authForm.value.password)
    this.authForm.value.email
  }

  onSubmit() {
    console.log('data :' +  this.authForm.value)
    this.authForm.reset();
  }

}
