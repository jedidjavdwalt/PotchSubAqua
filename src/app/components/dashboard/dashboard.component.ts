import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import * as inventoryActions from '../../store/actions/inventory.actions';
import * as inventorySelectors from '../../store/selectors/inventory.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  primaryBtn = undefined;
  secondaryBtn = undefined;
  tertiaryBtn = undefined;

  inventoryItems = [];

  showList = true;
  showAdd = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  activatePrimaryBtn(btn: string) {
    this.primaryBtn = btn;
    this.secondaryBtn = undefined;
    this.tertiaryBtn = undefined;
  }

  activateSecondaryBtn(btn: string) {
    this.secondaryBtn = btn;
    this.tertiaryBtn = undefined;
  }

  activateTertiaryBtn(btn: string) {
    this.tertiaryBtn = btn;
  }

  toggleShowList() {
    this.showList = true;
    this.showAdd = false;
  }

  toggleShowAdd() {
    this.showList = false;
    this.showAdd = true;
  }

  displayInventoryStatus() {
    this.toggleShowList();
    switch (this.tertiaryBtn) {
      case 'Available':
        alert('displayInventoryStatus: Available');
        return;

      case 'Rented':
        alert('displayInventoryStatus: Rented');
        return;

      default:
        return;
    }
  }

  displayInventoryType() {
    this.toggleShowList();
    switch (this.tertiaryBtn) {
      case 'Mask':
        this.store.dispatch(new inventoryActions.RequestGetAllMasks());
        return;

      case 'Snorkel':
        this.store.dispatch(new inventoryActions.RequestGetAllSnorkels());
        return;

      case 'Glove':
        this.store.dispatch(new inventoryActions.RequestGetAllGloves());
        return;

      case 'Stick':
        this.store.dispatch(new inventoryActions.RequestGetAllSticks());
        return;

      case 'Fins':
        this.store.dispatch(new inventoryActions.RequestGetAllFins());
        return;

      default:
        return;
    }
  }

  addInventory() {
    this.toggleShowAdd();
    alert('addInventory');
  }

  sliceAppState() {
    this.store.select(inventorySelectors.inventoryItems).subscribe(inventoryItems => {
      this.inventoryItems = inventoryItems;
      this.inventoryItems.sort((a, b) => (a.number > b.number) ? 1 : -1);
    });
  }

  ngOnInit() {
    this.sliceAppState();
  }

}
