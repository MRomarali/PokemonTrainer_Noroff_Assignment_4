import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_TRAINER_KEY } from 'src/app/constants';
import { getLocalStorage, setLocalStorage } from 'src/app/helpers/storage.helper';
import { Trainer } from 'src/app/models/trainer.model';
import { ApiService } from 'src/app/service/api.service';

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
  customError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(getLocalStorage(STORAGE_TRAINER_KEY)) { // If already logged in reroute to main page.
      this.router.navigate(['catalogue']);
    }

    // Form
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
      return; // return if invalid (skip everything after this line).
    }

    let trainer: Trainer = { id: -1, username: this.loginForm.value.username, collection: [] };
    
    // Save Trainer to API
    this.api.postTrainer(trainer);

    // Save Trainer to local storage
    setLocalStorage(STORAGE_TRAINER_KEY, trainer);

    if(!this.api.getTrainer(trainer.username)) {
      this.customError = "Oops, something went wrong! Could not find you in the API... :(";
      return; // TODO: Throw error
    }

    this.router.navigate(['catalogue']); // Reroute to catalogue page.
  }

  /**
   * Clear form data value.
   */
  onReset(): void {
    this.submitted = false; // Reset submit status.
    this.loginForm.reset(); // Reset page.
  }
}
