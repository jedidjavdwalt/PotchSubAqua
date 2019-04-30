import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { Rental } from 'src/app/models/Rental';
import * as firebase from 'firebase';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  rental: Rental = {} as Rental;

  constructor(
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
  ) { }

  createRentalToAdd(
    rental: Rental,
    selectedRentalMask: string,
    selectedRentalSnorkel: string,
    selectedRentalGlove: string,
    selectedRentalStick: string,
    selectedRentalFins: string,
  ): string {
    this.rental = rental;
    this.rental.dateKitOut = this.calculateDateKitOut();
    this.rental.dateKitDue = this.calculateDateKitDue(this.rental.type);
    this.rental.feeDue = this.calculateFeeDue(this.rental.type);
    this.rental.id = this.calculateId(moment().format().slice(0, 10) + '_' + this.rental.player);
    this.rental.actionRequired = this.calculateActionRequired(this.rental);

    if (!this.rental.player ||
      !this.rental.type) {
      return 'You forgot to select a player or type';
    }

    if (!selectedRentalMask &&
      !selectedRentalSnorkel &&
      !selectedRentalGlove &&
      !selectedRentalStick &&
      !selectedRentalFins) {
      return 'You forgot to select any inventory items';
    }

    if (selectedRentalMask) {
      this.rental.inventoryItems.push(selectedRentalMask);
    }
    if (selectedRentalSnorkel) {
      this.rental.inventoryItems.push(selectedRentalSnorkel);
    }
    if (selectedRentalGlove) {
      this.rental.inventoryItems.push(selectedRentalGlove);
    }
    if (selectedRentalStick) {
      this.rental.inventoryItems.push(selectedRentalStick);
    }
    if (selectedRentalFins) {
      this.rental.inventoryItems.push(selectedRentalFins);
    }

    return this.addRental();
  }

  addRental(): string {
    let alert = null;

    return alert;
  }

  convertDateStringToTimestamp(stringToConvert: string) {
    return firebase.firestore.Timestamp.fromDate(new Date(stringToConvert));
  }

  calculateDateKitOut() {
    return this.convertDateStringToTimestamp(moment().format());
  }

  calculateDateKitDue(rentalType: string) {
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
    const currentDate = moment();
    const dateKitDue = moment(rental.dateKitDue.toDate());

    if (rental.type === 'Day') {
      if (rental.feePaid !== rental.feeDue) {
        actionRequired = 'Player';
      } else if (!rental.dateKitIn && currentDate > dateKitDue) {
        actionRequired = 'Player';
      } else {
        actionRequired = 'None';
      }
    } else {
      if (rental.feePaid !== rental.feeDue) {
        if (rental.dateKitIn) {
          actionRequired = 'None';
        } else {
          actionRequired = 'Player';
        }
      } else if (!rental.dateKitIn && currentDate > dateKitDue) {
        actionRequired = 'Player';
      } else if (rental.dateKitIn && !rental.feeReturned) {
        actionRequired = 'Admin';
      } else {
        actionRequired = 'None';
      }
    }

    return actionRequired;
  }
}
