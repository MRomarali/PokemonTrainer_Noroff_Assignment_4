import { Trainer } from './../../models/trainer.model';
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
  username: String = "";
  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.update();
  }

  /**
   * Updates collection data from local storage.
   */
  private update(): void {
    const data: string | null = localStorage.getItem(STORAGE_TRAINER_KEY);
    const trainerData = data ? data : 'null';
    const trainer: Trainer = JSON.parse(trainerData);
    this.username = trainer.username;
    this.collection = trainer.collection;
  }

  /**
   * Remove pokemon from collection & update local storage collection.
   * @param id 
   */
  public onRemoveClicked(id: number): void {
    // Make sure user wishes to delete caught pokemon.
    if (confirm('Are you sure you wish to delete this pokemon?')) {
      this.collectionService.removeFromCollection(id); // Remove pokemon from collection
      this.update(); // update collection.
    }
  }
}
