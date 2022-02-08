import { Component, OnInit } from '@angular/core';
import { API_POKE_URL, STORAGE_POKE_KEY, STORAGE_TRAINER_KEY } from 'src/app/constants';
import { clamp } from 'src/app/helpers/math.helper';
import { getLocalStorageAsString, getSessionStorage, setSessionStorage } from 'src/app/helpers/storage.helper';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { ApiService } from 'src/app/service/api.service';
import { CollectionService } from 'src/app/service/collection.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  apiMaxLimit: number = 898; // Max number of Pokemons to fetch from API. (More than 898 throws error).
  collection: Pokemon[] = []; // Catalogue collection of pokemons from API.
  pokemonInTrainer: Pokemon[] = []; // Pokemons in Trainer Collection.

  constructor(private collectionService: CollectionService, private apiService: ApiService) { }

  ngOnInit(): void {
    // Create and empty array of Pokemons in Trainer Collection.
    // Bypasses an issue where HTML did not read the ID in a desired way.
    for (let index = 0; index < this.apiMaxLimit; index++) {
      this.pokemonInTrainer.push({ id: -1, name: 'null', url: 'null' }); // "Empty" pokemon object.
    }

    // Check if Pokemon Catalogue exists in Session Storage before proceeding.
    if (!getSessionStorage(STORAGE_POKE_KEY)) {
      this.apiGetPokemon(); // 1118 is max.
    } else {
      this.update(); // If Pokemon Catalogue exists update it.
    }
  }

  /**
   * Update session and local storage values to match current collection state.
   */
  private update(): void {
    const data: string | null = sessionStorage.getItem(STORAGE_POKE_KEY);
    const collection = data ? data : 'null';

    this.collection = JSON.parse(collection).results;
    const trainer = JSON.parse(getLocalStorageAsString(STORAGE_TRAINER_KEY) || 'null');

    // Helps with visuals of having caught a pokemon.
    if (trainer.collection.length > 0) { // Make sure Trainer collection is not empty.

      // Iterate over all Pokemons in catalogue and Trainer collection and find matching pairs.
      for (let index = 0; index < this.pokemonInTrainer.length; index++) {
        for (let innerIndex = 0; innerIndex < trainer.collection.length; innerIndex++) {
          const pokemonInCollection = trainer.collection[innerIndex];
          if (pokemonInCollection.id - 1 === index) { // If ID matches.
            this.pokemonInTrainer[index] = pokemonInCollection; // add pokemon to "empty" pokemon array.
          }
        }
      }
    }
  }

  /**
   * Get pokemons from API (PokeAPI) & save them to session storage.
   * 
   * @param limit how many pokemon to fetch from API. (end point)
   * @param offset which position to start from when fetching from API. (start point)
   */
  async apiGetPokemon(limit = this.apiMaxLimit, offset = 0) {
    limit = clamp(limit, 0, this.apiMaxLimit);
    offset = clamp(offset, 0, (this.apiMaxLimit - limit)); // subtract limit so it doesnt overflow max.

    // 'Wrong' way to handle API req in Angular.
    await fetch(`${API_POKE_URL}/?limit=${limit}&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        const trainer: Trainer = JSON.parse(getLocalStorageAsString(STORAGE_TRAINER_KEY) || 'null');
        
        // Iterate through data from API and add ID to every object.
        for (let index = 0; index < trainer.collection.length; index++) {
          const pokemon = trainer.collection[index];
          if (pokemon.id) {
            const pokemonAPI = data.results[pokemon.id - 1];
            data.results[pokemon.id - 1] = { id: pokemon.id, name: pokemonAPI.name, url: pokemonAPI.url };
          }
        }

        // Update session storage.
        setSessionStorage(STORAGE_POKE_KEY, data);
        this.update();
      });
  }

  /**
   * When trainer "Catches" a pokemon add them to their personal collection of caught pokemons.
   * @param id pokemon ID.
   */
  public onAddClicked(id: number): void {
    this.collection[id].id = id + 1; // Add id to pokemon before adding in collection. (Image url)
    this.collectionService.addToCollection(this.collection[id]);

    // Add Pokemon to API
    const trainer: Trainer = JSON.parse(getLocalStorageAsString(STORAGE_TRAINER_KEY) || 'null');
    this.apiService.patchTrainer(trainer);

    this.pokemonInTrainer[id] = this.collection[id]; // set caught pokemon.
  }
}
