import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { Rental } from 'src/app/models/Rental';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { InventoryItem, InventoryItemData } from 'src/app/models/InventoryItem';
import * as inventoryActions from '../../store/actions/inventory.actions';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  constructor(
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
  ) { }

  createRentalToAdd(rentalToAdd: Rental): string {
    let rental: Rental = {} as Rental;

    // playerFullName, rentalType, feePaid
    rental = rentalToAdd;

    if (!rental.playerFullName ||
      !rental.rentalType) {
      return 'You forgot to select a player or type';
    }

    // inventoryItems
    if (rental.inventoryItems.length === 0) {
      return 'You forgot to select any inventory items';
    }

    // startDate
    rental.startDate = this.calculateStartDate();

    // docId
    rental.docId = this.calculateDocId(moment(rental.startDate).format().slice(0, 10), rental.playerFullName);

    // displayId
    rental.displayId = this.calculateDisplayId(moment(rental.startDate).format().slice(0, 10), rental.playerFullName);

    // dueDate
    rental.dueDate = this.calculateDueDate(rental.rentalType);

    // endDate
    rental.endDate = null;

    // feeDue
    rental.feeDue = this.calculateFeeDue(rental.rentalType);

    // feeReturned
    rental.feeReturned = null;

    // actionRequired
    rental.actionRequired = this.calculateActionRequired(rental);

    return this.addRental(rental);
  }

  calculateDocId(startDate: string, playerFullName: string) {
    let newId = startDate + '_' + playerFullName;

    while (newId.indexOf(' ') !== -1) {
      newId = newId.replace(' ', '_');
    }

    return newId;
  }

  calculateDisplayId(startDate: string, playerFullName: string) {
    return startDate + ' ' + playerFullName;
  }

  calculateStartDate() {
    return this.convertDateStringToTimestamp(moment().format());
  }

  convertDateStringToTimestamp(dateString: string) {
    return firebase.firestore.Timestamp.fromDate(new Date(dateString));
  }

  calculateDueDate(rentalType: string) {
    let dateKitDue = moment();
    const currentYear = moment().year();

    rentalType === 'Day'
      ? dateKitDue.add(1, 'days')
      : rentalType === 'Beginner'
        ? dateKitDue.add(1, 'months')
        : dateKitDue = moment(`${currentYear}-03-31`);

    return this.convertDateStringToTimestamp(dateKitDue.format());
  }

  calculateFeeDue(rentalType: string) {
    let feeDue;

    rentalType === 'Day'
      ? feeDue = 5
      : rentalType === 'Beginner'
        ? feeDue = 250
        : feeDue = 500;

    return feeDue;
  }

  calculateActionRequired(rental: Rental) {
    let actionRequired: string;

    rental.rentalType === 'Day' && rental.feePaid !== rental.feeDue
      ? actionRequired = 'Player'
      : actionRequired = 'None';

    return actionRequired;
  }

  addRental(rental: Rental): string {
    let alert = null;
    let inventoryItemToUpdate: InventoryItem = {} as InventoryItem;

    // add rental
    this.angularFirestore.collection('/rentals/').doc(rental.docId).get().subscribe(snapShot => {
      if (!snapShot.exists) {
        this.angularFirestore.collection('/rentals/').doc(rental.docId).set(rental);
        alert = rental.displayId + ' added';
        rental = {} as Rental;
      } else {
        alert = rental.displayId + ' already exists';
        rental = {} as Rental;
      }
    });

    // update inventory items status
    rental.inventoryItems.forEach(inventoryItem => {
      this.angularFirestore.collection('/inventory/', ref => ref.where('rentalId', '==', inventoryItem)).get().subscribe(snapShot => {
        if (snapShot.size === 1) {
          inventoryItemToUpdate = new InventoryItem(snapShot.docs[0].data() as InventoryItemData);
          inventoryItemToUpdate.status = 'Rented';
          this.angularFirestore.collection('/inventory/').doc(inventoryItemToUpdate.id).update(inventoryItemToUpdate.toData());
          if (inventoryItemToUpdate.type === 'Mask') {
            this.store.dispatch(new inventoryActions.RequestGetAvailableMasks());
          } else if (inventoryItemToUpdate.type === 'Snorkel') {
            this.store.dispatch(new inventoryActions.RequestGetAvailableSnorkels());
          } else if (inventoryItemToUpdate.type === 'Glove') {
            this.store.dispatch(new inventoryActions.RequestGetAvailableGloves());
          } else if (inventoryItemToUpdate.type === 'Stick') {
            this.store.dispatch(new inventoryActions.RequestGetAvailableSticks());
          } else if (inventoryItemToUpdate.type === 'Fins') {
            this.store.dispatch(new inventoryActions.RequestGetAvailableFins());
          }
          alert = inventoryItemToUpdate.displayId + ' status updated';
          inventoryItemToUpdate = {} as InventoryItem;
        } else if (snapShot.size === 0) {
          alert = inventoryItem + ' not found';
          return;
        } else if (snapShot.size < 1) {
          alert = 'More than one ' + inventoryItem;
        }
      });
    });

    return alert;
  }
}
