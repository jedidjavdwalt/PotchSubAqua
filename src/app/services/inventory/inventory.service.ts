import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private angularFirestore: AngularFirestore,
  ) { }

  createInventoryItemToAdd(inventoryItemToAdd: InventoryItem): string {
    let inventoryItem = {} as InventoryItem;

    // type, number, brand, color, description, status
    inventoryItem = inventoryItemToAdd;

    if (!inventoryItem.type ||
      !inventoryItem.number ||
      !inventoryItem.brand ||
      !inventoryItem.color ||
      !inventoryItem.description ||
      !inventoryItem.status) {
      return 'You forgot to fill in some fields';
    }

    // docId
    inventoryItem.docId = this.calculateDocId(inventoryItem.number, inventoryItem.brand, inventoryItem.type);

    // displayId
    inventoryItem.displayId = this.calculateDisplayId(inventoryItem.number, inventoryItem.brand, inventoryItem.type);

    return this.addInventoryItem(inventoryItem);
  }

  calculateDocId(inventoryItemNumber: number, brand: string, type: string) {
    let newId = inventoryItemNumber + '_' + brand + '_' + type;

    while (newId.indexOf(' ') !== -1) {
      newId = newId.replace(' ', '_');
    }

    return newId;
  }

  calculateDisplayId(inventoryItemNumber: number, brand: string, type: string) {
    return inventoryItemNumber + '. ' + brand + ' ' + type;
  }

  addInventoryItem(inventoryItem): string {
    let alert = null;

    // add inventory item
    this.angularFirestore.collection('/inventory/').doc(inventoryItem.docId).get().subscribe(snapShot => {
      if (!snapShot.exists) {
        this.angularFirestore.collection('inventory').doc(inventoryItem.docId).set(inventoryItem);
        alert = inventoryItem.displayId + ' added';
      } else {
        alert = inventoryItem.displayId + ' already exists';
      }
    });

    inventoryItem = {} as InventoryItem;
    return alert;
  }
}
