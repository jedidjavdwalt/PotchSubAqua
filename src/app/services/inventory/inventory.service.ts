import { Injectable } from '@angular/core';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as inventoryActions from '../../store/actions/inventory.actions';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private angularFirestore: AngularFirestore,
    private store: Store<AppState>,
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

  createInventoryItemToEdit(inventoryItemToEdit: InventoryItem) {
    let inventoryItem = {} as InventoryItem;

    inventoryItem = inventoryItemToEdit;

    this.editInventoryItem(inventoryItem);
  }

  editInventoryItem(inventoryItem: InventoryItem) {
    this.angularFirestore.collection('/inventory/').doc(inventoryItem.docId).update(inventoryItem.toData()).then(() => {
      alert(inventoryItem.displayId + ' saved');
      this.store.dispatch(new inventoryActions.SetSelectedInventoryItem(inventoryItem));
    }).catch(error => {
      alert(error);
    });
  }
}
