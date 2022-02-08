import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = "";//"https://pokemon-assignment-4.herokuapp.com";
  private API_KEY = "qxuKn1ElJllTdVmPak1engp73N1tuDDuCw7Af8BRbIVTZ0R6eUL1V14RZJrzaW6x";

  constructor() { }

  public async postTrainer(trainer: Trainer) {
    const options = {
      method: 'POST',
      headers: {
        'X-API-Key': this.API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: trainer.username,
        pokemon: trainer.collection
      }),
    }
    await this.post(`${this.API_URL}/trainers?username=${trainer.username}`, options);
  }

  public async getTrainer(username: string): Promise<Trainer> {
    return await this.get(`${this.API_URL}/trainers?username=${username}`, username);
  }

  public async patchTrainer(trainer: Trainer) {
    const options = {
      method: 'PATCH', // NB: Set method to PATCH
      headers: {
        'X-API-Key': this.API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Provide new Pokémon to add trainer with id
        pokemon: trainer.collection
      }),
    }
    await this.patch(`${this.API_URL}/trainers/${trainer.id}`, options);
  }


  private async post(url: string, data: object) {
    await fetch(`${url}`, data)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not create new Trainer');
        }
        return response.json();
      })
      .then(trainer => {
        // newUser is the new trainer user with an id
        console.log(`${trainer} was found in database!`);
      })
      .catch(errorMessage => { console.error(errorMessage); });
  }

  private async get(url: string, data: string): Promise<any> {
    await fetch(`${url}`)
      .then(response => response.json())
      .then(results => {
        // results will be an array of users that match the username of ash.
        console.log(`${data} was found in database!`);
        return results;
      })
      .catch(errorMessage => { console.error(errorMessage); });

      return null;
  }

  private async patch(url: string, options: object) {
    await fetch(`${url}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not update trainer')
        }
        return response.json()
      })
      .then(updatedTrainer => {
        // updatedTrainer is the trainer user the Patched data
        console.log(updatedTrainer);
      })
      .catch(errorMessage => { console.error(errorMessage) });
  }
}
