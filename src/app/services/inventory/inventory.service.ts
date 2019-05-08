import { Injectable } from '@angular/core';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private angularFirestore: AngularFirestore,
  ) { }

  createInventoryItemToAdd(inventoryItemToAdd: InventoryItem) {
    let inventoryItem = {} as InventoryItem;

    inventoryItem = inventoryItemToAdd;
    inventoryItem.status = 'Available';
    inventoryItem.docId = this.calculateDocId(inventoryItem.number, inventoryItem.brand, inventoryItem.type);
    inventoryItem.displayId = this.calculateDisplayId(inventoryItem.number, inventoryItem.brand, inventoryItem.type);

    this.addInventoryItem(inventoryItem);
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

  addInventoryItem(inventoryItem: InventoryItem) {
    this.angularFirestore.collection('/inventory/', ref => ref.where('type', '==', inventoryItem.type)
      .where('number', '==', inventoryItem.number)).get().subscribe(snapShot => {
        if (snapShot.size > 0) {
          alert(inventoryItem.type + inventoryItem.number + ' already exists');
        } else {
          this.angularFirestore.collection('/inventory/').doc(inventoryItem.docId).set(inventoryItem).then(() => {
            alert(inventoryItem.displayId + ' added');
          }).catch(error => {
            alert(error);
          });
        }
      });
  }
}
