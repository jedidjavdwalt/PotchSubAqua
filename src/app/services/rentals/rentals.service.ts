import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { Rental, RentalData } from 'src/app/models/Rental';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { InventoryItem, InventoryItemData } from 'src/app/models/InventoryItem';
import * as inventoryActions from '../../store/actions/inventory.actions';
import * as rentalActions from '../../store/actions/rentals.actions';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  constructor(
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
  ) { }

  // getRentalsToCheck() {
  //   // if (moment().date() !== 1) {
  //   //   return;
  //   // }

  //   const rentals: Rental[] = [];

  //   this.angularFirestore.collection('/rentals/').get().subscribe(snapShot => {
  //     snapShot.docs.forEach(doc => {
  //       rentals.push(new Rental(doc.data() as RentalData));
  //     });
  //     rentals.forEach(rental => this.checkRental(rental));
  //   });
  // }

  // checkRental(rental: Rental) {
  //   console.log('check rental');
  // }

  createRentalToAdd(rentalToAdd: Rental) {
    let rental: Rental = Object.assign(Rental);

    rental = rentalToAdd;
    rental.startDate = this.calculateStartDate();
    rental.docId = this.calculateDocId(moment(rental.startDate.toDate()).format().slice(0, 10), rental.player);
    rental.displayId = this.calculateDisplayId(moment(rental.startDate.toDate()).format().slice(0, 10), rental.player);
    rental.dueDate = this.calculateDueDate(rental.type);
    rental.endDate = null;
    rental.feeDue = this.calculateFeeDue(rental.type);
    rental.feeReturned = null;
    rental.actionRequired = this.calculateActionRequired(rental);

    this.addRental(rental);
  }

  calculateDocId(startDate: string, playerFullName: string) {
    let newId = startDate + '_' + playerFullName;

    while (newId.indexOf('-') !== -1 || newId.indexOf(' ') !== -1) {
      newId = newId.replace('-', '_');
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
    const currentDate = moment();
    const currentSeasonEnd = moment(`${currentYear}-03-31`);

    rentalType === 'Day'
      ? dateKitDue.add(1, 'days')
      : rentalType === 'Beginner'
        ? dateKitDue.add(1, 'months')
        : currentDate > currentSeasonEnd
          ? dateKitDue = currentSeasonEnd.add(1, 'years')
          : dateKitDue = currentSeasonEnd;

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

    rental.feePaid !== rental.feeDue
      ? actionRequired = 'Player'
      : actionRequired = 'None';

    return actionRequired;
  }

  addRental(rental: Rental) {
    this.angularFirestore.collection('/rentals/').doc(rental.docId).set(rental).then(() => {
      alert(rental.displayId + ' added');
      this.updateInventoryItemsStatuses(rental, 'Rented');
    }).catch(error => {
      alert(error);
    });
  }

  updateInventoryItemsStatuses(rental: Rental, status: string) {
    let inventoryItemToUpdate: InventoryItem = {} as InventoryItem;

    rental.inventoryItems.forEach(inventoryItem => {
      this.angularFirestore.collection('/inventory/', ref => ref.where('displayId', '==', inventoryItem)).get().subscribe(snapShot => {
        if (snapShot.size === 1) {
          inventoryItemToUpdate = new InventoryItem(snapShot.docs[0].data() as InventoryItemData);
          inventoryItemToUpdate.status = status;
          this.angularFirestore.collection('/inventory/').doc(inventoryItemToUpdate.docId).update(inventoryItemToUpdate.toData())
            .then(() => {
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
              alert('Inventory item(s) status(es) updated');
            })
            .catch(error => {
              alert(error);
            });
        } else if (snapShot.size === 0) {
          alert(inventoryItem + ' not found');
          return;
        } else if (snapShot.size < 1) {
          alert('More than one ' + inventoryItem);
        }
      });
    });
  }

  editRental(rental: Rental) {
    console.log(rental);

    // this.angularFirestore.collection('/rentals/').doc(rental.docId).update(rental).then(() => {
    //   alert(rental.displayId + ' updated');
    //   this.store.dispatch(new rentalActions.SetSelectedRental(rental));
    // }).catch(error => {
    //   alert(error);
    // });
  }
}
