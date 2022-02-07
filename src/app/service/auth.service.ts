import { Injectable } from '@angular/core';
import { STORAGE_TRAINER_KEY } from '../constants';
import { getLocalStorage } from '../helpers/storage.helper';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  trainer: Trainer = { username: 'null', collection: [] }
  constructor() { }

  // getters & setters
  /**
   * Get Trainer field.
   */
  get getTrainer(): Trainer {
    return this.trainer;
  }

  /**
   * Check local storage if Trainer has been saved.
   * @returns true if Trainer exists in local storage.
   */
  isLoggedIn(): boolean {
    const auth = getLocalStorage(STORAGE_TRAINER_KEY);
    if (auth) { return true; }

    return false;
  }
}
