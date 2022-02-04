import { Component, OnInit } from '@angular/core';
import { API_POKE_URL, STORAGE_POKE_KEY } from 'src/app/constants';
import { clamp } from 'src/app/helpers/math.helper';
import { getSessionStorage, setSessionStorage } from 'src/app/helpers/storage.helper';
import { Pokemon } from 'src/app/models/pokemon.model';
import { CollectionService } from 'src/app/service/collection.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  apiMaxLimit: number = 898;
  collection: Pokemon[] = [];

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
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
  }

  async apiGetPokemon(limit = this.apiMaxLimit, offset = 0) {
    limit = clamp(limit, 0, this.apiMaxLimit);
    offset = clamp(offset, 0, (this.apiMaxLimit - limit)); // subtract limit so it doesnt overflow max.

    await fetch(`${API_POKE_URL}/?limit=${limit}&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        setSessionStorage(STORAGE_POKE_KEY, data);
        this.update();
      });
  }

  public onAddClicked(id: number): void {
    if(confirm(`Are you sure you wish to add ${this.capitalize(this.collection[id].name)}?`)) {
      this.collection[id].id = id + 1; // Add id to pokemon before adding in collection. (Image url)
      this.collectionService.addToCollection(this.collection[id]);
    }
  }

  private capitalize(input: string): string {
    const output = input[0].toUpperCase() + input.substring(1, input.length);
    return output;
  }
}
