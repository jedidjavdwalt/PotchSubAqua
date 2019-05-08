import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {

  inventoryItemForm = this.formBuilder.group({
    type: ['', Validators.required],
    number: ['', Validators.required],
    brand: ['', Validators.required],
    color: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder,
  ) { }

  onAddClick() {
    const newInventoryItem = {
      type: this.inventoryItemForm.controls.type.value,
      number: this.inventoryItemForm.controls.number.value,
      brand: this.inventoryItemForm.controls.brand.value,
      color: this.inventoryItemForm.controls.color.value,
      description: this.inventoryItemForm.controls.description.value,
    } as InventoryItem;

    this.inventoryService.createInventoryItemToAdd(newInventoryItem);
  }

  ngOnInit() {
  }
}
