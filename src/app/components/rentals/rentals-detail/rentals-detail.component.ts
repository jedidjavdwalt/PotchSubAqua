import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rental } from 'src/app/models/Rental';

@Component({
  selector: 'app-rentals-detail',
  templateUrl: './rentals-detail.component.html',
  styleUrls: ['./rentals-detail.component.css']
})
export class RentalsDetailComponent implements OnInit {

  @Input() selectedRental: Rental;
  @Input() isEditing: boolean;

  @Output() editClicked = new EventEmitter();

  constructor() { }

  onEditClick() {
    this.editClicked.emit();
  }

  ngOnInit() {
  }

}
