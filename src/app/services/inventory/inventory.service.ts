import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventoryItem: InventoryItem = {} as InventoryItem;

  constructor(
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
  ) { }

  createInventoryItemToAdd(inventoryItem: InventoryItem): string {
    this.inventoryItem = inventoryItem;
    this.inventoryItem.id = this.inventoryItem.number + '_' + this.inventoryItem.brand + '_' + this.inventoryItem.type;
    this.inventoryItem.displayId = this.inventoryItem.number + '. ' + this.inventoryItem.brand + ' ' + this.inventoryItem.type;

    if (!this.inventoryItem.type ||
      !this.inventoryItem.number ||
      !this.inventoryItem.brand ||
      !this.inventoryItem.color ||
      !this.inventoryItem.description ||
      !this.inventoryItem.status) {
      return 'You forgot to fill in some fields';
    }

    return this.addInventoryItem();
  }

  addInventoryItem(): string {
    let alert = null;

    this.angularFirestore.collection('/inventory/').doc(this.inventoryItem.id).get().subscribe(snapShot => {
      if (!snapShot.exists) {
        this.angularFirestore.collection('inventory').doc(this.inventoryItem.id).set(this.inventoryItem);
        alert = this.inventoryItem.displayId + ' added';
      } else {
        alert = this.inventoryItem.displayId + ' already exists';
      }
    });

    this.inventoryItem = {} as InventoryItem;
    return alert;
  }
}
