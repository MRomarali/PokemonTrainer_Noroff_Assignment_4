import { Component } from '@angular/core';
import { STORAGE_TRAINER_KEY } from 'src/app/constants';
import { Pokemon } from 'src/app/models/pokemon.model';
import { CollectionService } from 'src/app/service/collection.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent {
  collection: Pokemon[] = [];

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.update();
  }

  /**
   * Updates collection data from local storage.
   */
  private update(): void {
    const data: string | null = localStorage.getItem(STORAGE_TRAINER_KEY);
    const collection = data ? data : 'null';

    this.collection = JSON.parse(collection).collection;
  }

  /**
   * Remove pokemon from collection & update local storage collection.
   * @param id 
   */
  public onRemoveClicked(id: number): void {
    if (confirm('Are you sure you wish to delete this pokemon?')) {
      this.collectionService.removeFromCollection(id);
      this.update();
    }
  }
}
