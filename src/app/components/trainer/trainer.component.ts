import { Component } from '@angular/core';
import { CollectionService } from 'src/app/service/collection.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent {
  constructor(private collectionService: CollectionService) { }

  public onRemoveClicked(id: number): void {
    if(confirm('Are you sure you wish to delete this pokemon?')) {
      this.collectionService.removeFromCollection(id);
    }
  }
}
