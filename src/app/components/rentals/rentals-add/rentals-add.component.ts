import { Component, OnInit, Input } from '@angular/core';
import { Rental } from 'src/app/models/Rental';
import { RentalsService } from 'src/app/services/rentals/rentals.service';
import { Player } from 'src/app/models/Player';
import { InventoryItem } from 'src/app/models/InventoryItem';

@Component({
  selector: 'app-rentals-add',
  templateUrl: './rentals-add.component.html',
  styleUrls: ['./rentals-add.component.css']
})
export class RentalsAddComponent implements OnInit {

  @Input() players: Player[];
  @Input() availableMasks: InventoryItem[];
  @Input() availableSnorkels: InventoryItem[];
  @Input() availableGloves: InventoryItem[];
  @Input() availableSticks: InventoryItem[];
  @Input() availableFins: InventoryItem[];

  newRental: Rental = {} as Rental;
  selectedRentalMask = null;
  selectedRentalSnorkel = null;
  selectedRentalGlove = null;
  selectedRentalStick = null;
  selectedRentalFins = null;

  constructor(
    private rentalService: RentalsService,
  ) { }

  addClicked() {
    alert(this.rentalService.createRentalToAdd(
      this.newRental,
      this.selectedRentalMask,
      this.selectedRentalSnorkel,
      this.selectedRentalGlove,
      this.selectedRentalStick,
      this.selectedRentalFins)
    );

    this.newRental = {} as Rental;
  }

  ngOnInit() {
  }

}
