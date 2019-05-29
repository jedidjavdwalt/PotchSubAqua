import { Component, OnInit, Input } from '@angular/core';
import { Rental } from 'src/app/models/Rental';

@Component({
  selector: 'app-rentals-detail',
  templateUrl: './rentals-detail.component.html',
  styleUrls: ['./rentals-detail.component.css']
})
export class RentalsDetailComponent implements OnInit {

  @Input() selectedRental: Rental;

  constructor() { }

  ngOnInit() {
  }

}
