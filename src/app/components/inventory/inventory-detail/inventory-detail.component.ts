import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InventoryItem } from 'src/app/models/InventoryItem';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
})
export class InventoryDetailComponent implements OnInit {

  @Input() selectedInventoryItem: InventoryItem;
  @Input() isEditing: boolean;

  @Output() editClicked = new EventEmitter();

  constructor() { }

  onEditClick() {
    this.editClicked.emit();
  }

  ngOnInit() {
  }

}
