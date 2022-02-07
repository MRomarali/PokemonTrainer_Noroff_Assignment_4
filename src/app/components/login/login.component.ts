import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_TRAINER_KEY } from 'src/app/constants';
import { getLocalStorage, setLocalStorage } from 'src/app/helpers/storage.helper';
import { Trainer } from 'src/app/models/trainer.model';

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
    if(getLocalStorage(STORAGE_TRAINER_KEY)) { // If already logged in reroute to main page.
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

  // getters & setters
  /**
   * Get Login From data values.
   */
  get getFormData(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  /**
   * Save Trainer username to local storage and redirect to pokemon catalogue on success.
   * @returns if form is invalid.
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const trainer: Trainer = { username: this.loginForm.value.username, collection: [] };
    setLocalStorage(STORAGE_TRAINER_KEY, trainer);

    this.router.navigate(['catalogue']);
  }

  /**
   * Clear form data value.
   */
  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}
