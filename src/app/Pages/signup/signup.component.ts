import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ISignup } from 'src/app/models/ISignup';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupInfo: ISignup = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
    ],
    confirmpassword: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  submit() {
    this.signupInfo.name = String(this.signupForm.value.name);
    this.signupInfo.email = String(this.signupForm.value.email);
    this.signupInfo.password = String(this.signupForm.value.password);
    this.signupInfo.confirmPassword = String(
      this.signupForm.value.confirmpassword
    );
    if (
      this.signupForm.value.confirmpassword == this.signupForm.value.password
    ) {
      this.service.signup(this.signupInfo).subscribe({
        next: (res: string) => {
          alert('Account created successfully Please Login');
          this.router.navigate(['/login']);
          this.signupForm.reset();
        },
        error(error: HttpErrorResponse) {
          if (error.status == 409) {
            throw Error('Email Already Exist Please Log in')
          } else {
            throw Error('Please sign up');
          }
        },
      });
      this.signupForm.reset();
    } else {
      this.signupForm.controls.confirmpassword.setErrors({
        'must match': false,
      });
    }
  }
}
