import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { FormBuilder, Validators } from '@angular/forms';
import { RentalsService } from 'src/app/services/rentals/rentals.service';
import { Rental } from 'src/app/models/Rental';

@Component({
  selector: 'app-rentals-edit',
  templateUrl: './rentals-edit.component.html',
  styleUrls: ['./rentals-edit.component.css']
})
export class RentalsEditComponent implements OnInit {

  @Input() selectedRental: Rental;

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

  onSaveClick() {
    const editedRental = this.selectedRental;

    if (this.endDate.value) {
      editedRental.endDate = this.endDate.value;
    }

    if (this.feePaid.value) {
      editedRental.feePaid = this.feePaid.value;
    }

    if (this.feeReturned.value) {
      editedRental.feeReturned = this.feeReturned.value;
    }

    this.rentalService.editRental(editedRental);

    this.rentalForm.reset();
  }

  ngOnInit() {
  }

}
