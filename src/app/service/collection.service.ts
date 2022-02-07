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

  collection: Pokemon[] = []; // Initialize empty array.
  trainer: Trainer = { username: '', collection: [] }; // Initialize as empty.

  /**
   * On init get collection & trainer data.
   */
  private init(): void {
    // Get trainer from local storage
    this.trainer = JSON.parse(getLocalStorageAsString(STORAGE_TRAINER_KEY) || 'null');
    // Get collection from session storage
    const data = JSON.parse(getSessionStorageAsString(STORAGE_POKE_KEY) || 'null');
    if (data) this.collection = data.results; // IF exists set collection.
  }

  /**
   * Overwrite current or no data to new trainer data.
   */
  private save(): void {
    setLocalStorage(STORAGE_TRAINER_KEY, { username: this.trainer.username, collection: this.trainer.collection });
  }

  /**
   * Check if pokemon exists in collection and if it does return true.
   * @param pokemonId pokemon to find / compare.
   * @returns true if pokemon exists in collection.
   */
  public hasPokemonInCollection(pokemonId: number): boolean {
    // Iterate through Trainer Collection (Caught Pokemons).
    for (let index = 0; index < this.trainer.collection.length; index++) {
      if (pokemonId + 1 === this.trainer.collection[index].id) {
        return true; // if IDs match, return true.
      }
    }

    return false; // If IDs do not match, return false.
  }

  /**
   * Add pokemon to collection & save it.
   * @param pokemon pokemon to be added.
   */
  public addToCollection(pokemon: Pokemon): void {
    pokemon = { id: pokemon.id, name: pokemon.name, url: pokemon.url, hasPokemon: true }
    this.trainer.collection.push(pokemon); // Add pokemon to collection

    this.save(); // Save collection
  }

  /**
   * Remove pokemon from collection & save it.
   * @param removeId pokemon ID to find and remove from collection.
   */
  public removeFromCollection(removeId: number): void {
    this.trainer.collection.push(this.trainer.collection.splice(removeId, 1)[0]);
    this.trainer.collection.pop();

    this.save();
  }
}
