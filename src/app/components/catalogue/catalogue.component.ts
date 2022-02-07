import { Component, OnInit } from '@angular/core';
import { API_POKE_URL, STORAGE_POKE_KEY, STORAGE_TRAINER_KEY } from 'src/app/constants';
import { clamp } from 'src/app/helpers/math.helper';
import { getLocalStorageAsString, getSessionStorage, setSessionStorage } from 'src/app/helpers/storage.helper';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { CollectionService } from 'src/app/service/collection.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  apiMaxLimit: number = 898;
  collection: Pokemon[] = [];
  pokemonInTrainer: Pokemon[] = [];
  pokemonId: number[] = [];

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
    for (let index = 0; index < 900; index++) {
      this.pokemonInTrainer.push({ id: -1, name: 'null', url: 'null' });
    }
    console.log(this.pokemonInTrainer);

    if (!getSessionStorage(STORAGE_POKE_KEY)) {
      this.apiGetPokemon(); // 1118 is max.
    } else {
      this.update();
    }
  }

  private update(): void {
    const data: string | null = sessionStorage.getItem(STORAGE_POKE_KEY);
    const collection = data ? data : 'null';

    this.collection = JSON.parse(collection).results;
    const trainer = JSON.parse(getLocalStorageAsString(STORAGE_TRAINER_KEY) || 'null');
    if (trainer.collection.length > 0) {
      let posInTrainer = 0;
      for (let index = 0; index < this.pokemonInTrainer.length; index++) {
        const pokemon = trainer.collection[posInTrainer];

        for (let innerIndex = 0; innerIndex < trainer.collection.length; innerIndex++) {
            const pok = trainer.collection[innerIndex];
            if(pok.id - 1 === index) {
              this.pokemonInTrainer[index] = pok;
            }
        }
      }
    }
  }

  async apiGetPokemon(limit = this.apiMaxLimit, offset = 0) {
    limit = clamp(limit, 0, this.apiMaxLimit);
    offset = clamp(offset, 0, (this.apiMaxLimit - limit)); // subtract limit so it doesnt overflow max.

    // 'Wrong' way to handle API req in Angular.
    await fetch(`${API_POKE_URL}/?limit=${limit}&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        const trainer: Trainer = JSON.parse(getLocalStorageAsString(STORAGE_TRAINER_KEY) || 'null');
        for (let index = 0; index < trainer.collection.length; index++) {
          const pokemon = trainer.collection[index];
          if (pokemon.id) {
            const pokemonAPI = data.results[pokemon.id - 1];
            data.results[pokemon.id - 1] = { id: pokemon.id, name: pokemonAPI.name, url: pokemonAPI.url, hasPokemon: pokemon.hasPokemon };
          }
        }

        setSessionStorage(STORAGE_POKE_KEY, data);

        this.update();
      });
  }

  public onAddClicked(id: number): void {
    this.collection[id].id = id + 1; // Add id to pokemon before adding in collection. (Image url)
    this.collectionService.addToCollection(this.collection[id]);
    this.collection[id].hasPokemon = this.collectionService.hasPokemonInCollection(id);
    
    this.pokemonInTrainer[id] = this.collection[id];
  }
}
