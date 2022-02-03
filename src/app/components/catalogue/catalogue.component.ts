import { Component, OnInit } from '@angular/core';
import { API_POKE_URL, STORAGE_POKE_KEY } from 'src/app/constants';
import { clamp } from 'src/app/helpers/math.helper';
import { getSessionStorage, setSessionStorage } from 'src/app/helpers/storage.helper';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  apiMaxLimit: number = 1118;

  constructor() { }

  ngOnInit(): void {
    if (!getSessionStorage(STORAGE_POKE_KEY)) {
      this.apiGetPokemon(); // 1118 is max.
    }
  }

  async apiGetPokemon(limit = this.apiMaxLimit, offset = 0) {
    limit = clamp(limit, 0, this.apiMaxLimit);
    offset = clamp(offset, 0, (this.apiMaxLimit - limit)); // subtract limit so it doesnt overflow max.

    await fetch(`${API_POKE_URL}/?limit=${limit}&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        setSessionStorage(STORAGE_POKE_KEY, data);
      });
  }
}
