import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
})
export class InventoryAddComponent implements OnInit {

  inventoryItemForm = this.formBuilder.group({
    type: [null, Validators.required],
    number: [null, Validators.required],
    brand: [null, Validators.required],
    color: [null, Validators.required],
    description: [null, Validators.required],
  });

  constructor(
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder,
  ) { }

  get type() {
    return this.inventoryItemForm.get('type');
  }

  get number() {
    return this.inventoryItemForm.get('number');
  }

  get brand() {
    return this.inventoryItemForm.get('brand');
  }

  get color() {
    return this.inventoryItemForm.get('color');
  }

  get description() {
    return this.inventoryItemForm.get('description');
  }

  onAddClick() {
    const newInventoryItem = {
      type: this.inventoryItemForm.controls.type.value,
      number: this.inventoryItemForm.controls.number.value,
      brand: this.inventoryItemForm.controls.brand.value,
      color: this.inventoryItemForm.controls.color.value,
      description: this.inventoryItemForm.controls.description.value,
    } as InventoryItem;

    this.inventoryService.createInventoryItemToAdd(newInventoryItem);

    this.inventoryItemForm.reset();
  }

  ngOnInit() { }
}
