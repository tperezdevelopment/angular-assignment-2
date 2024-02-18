import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  invalidLogin = false;

  constructor(private auth: AuthService) { }

  get emailIsValid() {
    return (
      this.loginForm.get('email')!.touched &&
      !this.loginForm.get('email')!.valid
    );
  }
  
  get passwordIsValid() {
    return (
      this.loginForm.get('password')!.touched &&
      !this.loginForm.get('password')!.valid
    );
  }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  login() {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;
    this.auth.login(email,password);
  }

}