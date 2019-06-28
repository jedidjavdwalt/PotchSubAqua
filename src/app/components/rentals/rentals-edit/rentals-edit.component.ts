import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { FormBuilder, Validators } from '@angular/forms';
import { RentalsService } from 'src/app/services/rentals/rentals.service';
import { Rental } from 'src/app/models/Rental';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { Timestamp } from '@firebase/firestore-types';

@Component({
  selector: 'app-rentals-edit',
  templateUrl: './rentals-edit.component.html',
  styleUrls: ['./rentals-edit.component.css']
})
export class RentalsEditComponent implements OnInit {

  @Input() selectedRental: Rental;

  @Output() saveClicked = new EventEmitter();

  rentalForm = this.formBuilder.group({
    endDate: [null],
    feePaid: [null],
    feeReturned: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private rentalService: RentalsService,
  ) { }

  get endDate() {
    return this.rentalForm.get('endDate');
  }

  get feePaid() {
    return this.rentalForm.get('feePaid');
  }

  get feeReturned() {
    return this.rentalForm.get('feeReturned');
  }

  calculateMaxDate() {
    const currentDay = moment();
    return currentDay.format('YYYY-MM-DD');
  }

  calculateEndDate(): Timestamp {
    return firebase.firestore.Timestamp.fromDate(moment(this.endDate.value).toDate());
  }

  onSaveClick() {
    if (!this.endDate.value || !this.feePaid.value || !this.feeReturned.value) {
      this.saveClicked.emit();
      return;
    }

    const editedRental = this.selectedRental;

    if (this.endDate.value) {
      editedRental.endDate = this.calculateEndDate();
    }

    if (this.feePaid.value) {
      editedRental.feePaid = this.feePaid.value;
    }

    if (this.feeReturned.value) {
      editedRental.feeReturned = this.feeReturned.value;
    }

    this.rentalService.editRental(editedRental);

    this.rentalForm.reset();

    this.saveClicked.emit();
  }

  ngOnInit() {
  }

}
