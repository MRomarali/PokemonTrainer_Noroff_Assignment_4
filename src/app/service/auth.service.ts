import { Injectable } from '@angular/core';
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
    return false;
  }
}
