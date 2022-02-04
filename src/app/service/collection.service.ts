import { Injectable } from '@angular/core';
import { STORAGE_TRAINER_KEY } from '../constants';
import { getLocalStorageAsString, setLocalStorage } from '../helpers/storage.helper';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor() {
    this.init();
  }

  trainer: Trainer = { username: '', collection: [] };

  // Methods
  private init(): void {
    // Get collection
    this.trainer = JSON.parse(getLocalStorageAsString(STORAGE_TRAINER_KEY) || 'null');
  }

  private save(): void {
    // Overwrite collection
    setLocalStorage(STORAGE_TRAINER_KEY, { username: this.trainer.username, collection: this.trainer.collection });
  }

  public hasPokemonInCollection(pokemonId: number): boolean {
    return false;
  }

  public addToCollection(newPokemon: Pokemon): void {
    this.trainer.collection.push(newPokemon);
    console.log(this.trainer.collection);

    this.save();
  }

  public removeFromCollection(removeId: number): void {
    this.trainer.collection.push(this.trainer.collection.splice(removeId, 1)[0]);
    this.trainer.collection.pop();

    this.save();
  }
}
