import { Component, OnInit, Input } from '@angular/core';
import { Rental } from 'src/app/models/Rental';
import { RentalsService } from 'src/app/services/rentals/rentals.service';
import { Player } from 'src/app/models/Player';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { FormBuilder, Validators, FormGroup, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-rentals-add',
  templateUrl: './rentals-add.component.html',
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
    type: new FormControl(null, Validators.required),
    feePaid: new FormControl(null),
  });

  inventoryItemsForm = new FormGroup({
    selectedMask: new FormControl(null),
    selectedSnorkel: new FormControl(null),
    selectedGlove: new FormControl(null),
    selectedStick: new FormControl(null),
    selectedFins: new FormControl(null),
  });

  constructor(
    private rentalService: RentalsService,
  ) { }

  get player() {
    return this.rentalForm.get('player');
  }

  get type() {
    return this.rentalForm.get('type');
  }

  get feePaid() {
    return this.rentalForm.get('feePaid');
  }

  get selectedMask() {
    return this.inventoryItemsForm.get('selectedMask');
  }

  get selectedSnorkel() {
    return this.inventoryItemsForm.get('selectedSnorkel');
  }

  get selectedGlove() {
    return this.inventoryItemsForm.get('selectedGlove');
  }

  get selectedStick() {
    return this.inventoryItemsForm.get('selectedStick');
  }

  get selectedFins() {
    return this.inventoryItemsForm.get('selectedFins');
  }

  onAddClick() {
    const newInventoryItems = [];

    if (this.selectedMask.value) {
      newInventoryItems.push(this.selectedMask.value);
    }

    if (this.selectedSnorkel.value) {
      newInventoryItems.push(this.selectedSnorkel.value);
    }

    if (this.selectedGlove.value) {
      newInventoryItems.push(this.selectedGlove.value);
    }

    if (this.selectedStick.value) {
      newInventoryItems.push(this.selectedStick.value);
    }

    if (this.selectedFins.value) {
      newInventoryItems.push(this.selectedFins.value);
    }

    const newRental: Rental = {
      player: this.player.value,
      inventoryItems: newInventoryItems,
      type: this.type.value,
      feePaid: this.feePaid.value,
    } as Rental;

    this.rentalService.createRentalToAdd(newRental);

    this.rentalForm.reset();
    this.inventoryItemsForm.reset();
  }

  ngOnInit() {
  }

}
