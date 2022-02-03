import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_KEY } from 'src/app/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    trainerName: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem(STORAGE_KEY)) { // If already logged in reroute to main page.
      this.router.navigate(['catalogue']);
    }

    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(42)
        ]
      ]
    });
  }

  get getFormData(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.loginForm.value));

    this.router.navigate(['catalogue']);
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}
