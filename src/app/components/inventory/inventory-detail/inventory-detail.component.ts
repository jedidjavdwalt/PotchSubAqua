import { Component, OnInit, Input } from '@angular/core';
import { InventoryItem } from 'src/app/models/InventoryItem';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {

  @Input() selectedInventoryItem: InventoryItem;

  constructor() { }

  ngOnInit() {
  }

}
