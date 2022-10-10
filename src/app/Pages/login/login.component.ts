import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/ILogin';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginInfo: ILogin = {
    email: '',
    password: '',
  };
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
    ],
  });
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.loginInfo.email = String(this.loginForm.value.email);
    this.loginInfo.password = String(this.loginForm.value.password);
    this.service.login(this.loginInfo).subscribe({
      next: (res: string) => {
        alert('Login successful');
        sessionStorage.setItem('email', res);
        this.router.navigate(['/home']);
      },
      error(error: HttpErrorResponse) {
        if (error.status == 401) {
          throw Error(
            'Invalid credentials Please Login with valid credentials'
          );
        } else {
          throw Error('Please sign up');
        }
      },
    });
    this.loginForm.reset();
  }
}
