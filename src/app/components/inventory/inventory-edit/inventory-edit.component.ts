import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rental } from 'src/app/models/Rental';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { FormBuilder } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory/inventory.service';

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})
export class InventoryEditComponent implements OnInit {

  @Input() selectedInventoryItem: InventoryItem;

  @Output() saveClicked = new EventEmitter();

  inventoryItemForm = this.formBuilder.group({
    status: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
  ) { }

  get status() {
    return this.inventoryItemForm.get('status');
  }

  onSaveClick() {
    if (!this.status.value) {
      this.saveClicked.emit();
      return;
    }

    const editedInventoryItem = this.selectedInventoryItem;

    editedInventoryItem.status = this.status.value;

    this.inventoryService.createInventoryItemToEdit(editedInventoryItem);

    this.inventoryItemForm.reset();

    this.saveClicked.emit();
  }

  ngOnInit() {
  }

}
