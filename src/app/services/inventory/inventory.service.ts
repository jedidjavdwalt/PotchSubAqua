import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { InventoryItem } from 'src/app/models/InventoryItem';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventoryItem: InventoryItem = {} as InventoryItem;

  constructor(
    private store: Store<AppState>,
  ) { }

  createInventoryItemToAdd(): string {
    if (!this.inventoryItem.type ||
      !this.inventoryItem.number ||
      !this.inventoryItem.brand ||
      !this.inventoryItem.color ||
      !this.inventoryItem.description ||
      !this.inventoryItem.status) {
      return 'You forgot to fill in some fields';
    } else {
      this.inventoryItem.id = this.inventoryItem.number + '_' + this.inventoryItem.brand + '_' + this.inventoryItem.type;
      this.inventoryItem.rentalId = this.inventoryItem.number + '. ' + this.inventoryItem.brand + ' ' + this.inventoryItem.type;
      this.addInventory();
    }

    return this.addInventoryItem();
  }

  addInventoryItem(): string {
    let alert = null;

    return alert;
  }
}
