import { Component, OnInit, Input } from '@angular/core';
import { Rental } from 'src/app/models/Rental';
import { RentalsService } from 'src/app/services/rentals/rentals.service';
import { Player } from 'src/app/models/Player';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';

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

  rentalForm = new FormGroup({
    player: new FormControl(null, Validators.required),
    inventoryItems: new FormGroup({
      selectedMask: new FormControl(null),
      selectedSnorkel: new FormControl(null),
      selectedGlove: new FormControl(null),
      selectedStick: new FormControl(null),
      selectedFins: new FormControl(null),
    }),
    type: new FormControl(null, Validators.required),
    feePaid: new FormControl(null),
  });

  constructor(
    private rentalService: RentalsService,
  ) {
  }

  onAddClick() {
    const newSelectedMask = this.rentalForm.controls.inventoryItems.get('selectedMask');
    const newSelectedSnorkel = this.rentalForm.controls.inventoryItems.get('selectedSnorkel');
    const newSelectedGlove = this.rentalForm.controls.inventoryItems.get('selectedGlove');
    const newSelectedStick = this.rentalForm.controls.inventoryItems.get('selectedStick');
    const newSelectedFins = this.rentalForm.controls.inventoryItems.get('selectedFins');

    if (
      !newSelectedMask.value &&
      !newSelectedSnorkel.value &&
      !newSelectedGlove.value &&
      !newSelectedStick.value &&
      !newSelectedFins.value
    ) {
      alert('No inventory items selected');
    } else {
      const newInventoryItems = [];

      if (newSelectedMask.value) {
        newInventoryItems.push(newSelectedMask.value);
      }

      if (newSelectedSnorkel.value) {
        newInventoryItems.push(newSelectedSnorkel.value);
      }

      if (newSelectedGlove.value) {
        newInventoryItems.push(newSelectedGlove.value);
      }

      if (newSelectedStick.value) {
        newInventoryItems.push(newSelectedStick.value);
      }

      if (newSelectedFins.value) {
        newInventoryItems.push(newSelectedFins.value);
      }

      const newRental: Rental = {
        player: this.rentalForm.controls.player.value,
        inventoryItems: newInventoryItems,
        type: this.rentalForm.controls.type.value,
        feePaid: this.rentalForm.controls.feePaid.value,
      } as Rental;

      this.rentalService.createRentalToAdd(newRental);
      this.rentalForm.reset();
    }
  }

  ngOnInit() {
  }

}
