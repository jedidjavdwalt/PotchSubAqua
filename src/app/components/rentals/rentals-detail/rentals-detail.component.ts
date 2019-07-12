import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rental } from 'src/app/models/Rental';

@Component({
  selector: 'app-rentals-detail',
  templateUrl: './rentals-detail.component.html',
})
export class RentalsDetailComponent implements OnInit {

  @Input() selectedRental: Rental;
  @Input() isEditing: boolean;

  @Output() editClicked = new EventEmitter();

  constructor() { }

  shouldDisplayEditBtn() {
    return !this.selectedRental.endDate || !this.selectedRental.feePaid || !this.selectedRental.feeReturned;
  }

  onEditClick() {
    this.editClicked.emit();
  }

  ngOnInit() {
  }

}
