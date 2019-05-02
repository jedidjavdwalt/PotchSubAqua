import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { InventoryItem } from 'src/app/models/InventoryItem';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {

  newInventoryItem: InventoryItem = {} as InventoryItem;

  constructor(
    private inventoryService: InventoryService,
  ) { }

  addClicked() {
    alert(this.inventoryService.createInventoryItemToAdd(this.newInventoryItem));
    this.newInventoryItem = {} as InventoryItem;
  }

  ngOnInit() {
  }
}
