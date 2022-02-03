import { Injectable } from '@angular/core';
import { STORAGE_KEY } from '../constants';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  // getters & setters
  get getUser(): User {
    return { id: 0, username: '', pokemons: [] };
  }

  isLoggedIn(): boolean {
    const auth = localStorage.getItem(STORAGE_KEY);
    if (auth) { return true; }

    return false;
  }
}
