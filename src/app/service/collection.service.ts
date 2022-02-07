import { Injectable } from '@angular/core';
import { STORAGE_POKE_KEY, STORAGE_TRAINER_KEY } from '../constants';
import { getLocalStorageAsString, getSessionStorageAsString, setLocalStorage, setSessionStorage } from '../helpers/storage.helper';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor() {
    this.init();
  }

  collection: Pokemon[] = [];
  trainer: Trainer = { username: '', collection: [] };

  // Methods
  private init(): void {
    // Get collection
    this.trainer = JSON.parse(getLocalStorageAsString(STORAGE_TRAINER_KEY) || 'null');
    const data = JSON.parse(getSessionStorageAsString(STORAGE_POKE_KEY) || 'null');
    if (data) this.collection = data.results;
  }

  private save(): void {
    // Overwrite collection
    setLocalStorage(STORAGE_TRAINER_KEY, { username: this.trainer.username, collection: this.trainer.collection });
  }

  public hasPokemonInCollection(pokemonId: number): boolean {
    for (let index = 0; index < this.trainer.collection.length; index++) {
      const pokemon = this.trainer.collection[index];

      if (pokemonId + 1 === pokemon.id) {
        return true;
      }
    }

    return false;
  }

  public addToCollection(pokemon: Pokemon): void {
    pokemon = { id: pokemon.id, name: pokemon.name, url: pokemon.url, hasPokemon: true }
    this.trainer.collection.push(pokemon);

    this.save();
  }

  public removeFromCollection(removeId: number): void {
    this.trainer.collection.push(this.trainer.collection.splice(removeId, 1)[0]);
    this.trainer.collection.pop();
    
    this.save();
  }
}
