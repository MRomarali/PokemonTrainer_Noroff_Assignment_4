import { Injectable } from '@angular/core';
import { STORAGE_TRAINER_KEY } from '../constants';
import { getLocalStorage } from '../helpers/storage.helper';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  // getters & setters
  get getTrainer(): Trainer {
    return { id: 0, username: '', collection: [] };
  }

  isLoggedIn(): boolean {
    const auth = getLocalStorage(STORAGE_TRAINER_KEY);
    if (auth) { return true; }

    return false;
  }
}
