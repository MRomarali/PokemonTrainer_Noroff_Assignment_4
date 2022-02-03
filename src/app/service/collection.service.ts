import { Injectable } from '@angular/core';
import { STORAGE_TRAINER_KEY } from '../constants';
import { getLocalStorage } from '../helpers/storage.helper';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor() {
    this.init();
  }

  // public collection: Pokemon[] = [];

  // Methods
  private init(): void {
    // Get collection
    const currentCollection = getLocalStorage(STORAGE_TRAINER_KEY);
    if (currentCollection) {

    }
    // Overwrite collection
  }

  private save(): void {
    // Overwrite collection
    // setLocalStorage(STORAGE_TRAINER_KEY, { this.collection });
  }

  public hasPokemonInCollection(pokemonId: number): boolean {
    return false;
  }

  public addToCollection(newPokemon: Pokemon): boolean {
    return false;
  }

  public removeFromCollection(removeId: number): void { }
}
