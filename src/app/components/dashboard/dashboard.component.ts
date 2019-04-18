import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import * as inventoryActions from '../../store/actions/inventory.actions';
import * as inventorySelectors from '../../store/selectors/inventory.selectors';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { AngularFirestore } from '@angular/fire/firestore';

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

  shouldShowList = false;
  shouldShowDetail = false;
  shouldShowAdd = false;

  selectedInventoryItem = {} as InventoryItem;
  newInventoryItem = {} as InventoryItem;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
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
    this.shouldShowList = true;
    this.shouldShowDetail = false;
    this.shouldShowAdd = false;
  }

  toggleShowAdd() {
    this.shouldShowList = false;
    this.shouldShowDetail = false;
    this.shouldShowAdd = true;
  }

  toggleShowDetail() {
    this.shouldShowList = false;
    this.shouldShowDetail = true;
    this.shouldShowAdd = false;
  }

  displayInventoryStatusList() {
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

  displayInventoryTypeList() {
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

  displayAddInventory() {
    this.toggleShowAdd();
  }

  clickAddInventory() {
    if (!this.newInventoryItem.type ||
      !this.newInventoryItem.number ||
      !this.newInventoryItem.brand ||
      !this.newInventoryItem.color ||
      !this.newInventoryItem.description ||
      !this.newInventoryItem.status) {
      alert('You forgot to fill in some fields');
    } else {
      this.addInventory();
    }
  }

  addInventory() {
    switch (this.newInventoryItem.type) {
      case 'Mask':
        this.angularFirestore.collection('/inventory/').ref.where('type', '==', 'Mask')
          .where('number', '==', this.newInventoryItem.number).get().then(snapShot => {
            if (snapShot.size === 0) {
              this.angularFirestore.collection('inventory').add(this.newInventoryItem);
              alert('Mask added');
            } else {
              alert('Mask number already exists');
            }
          });
        break;

      case 'Snorkel':
        this.angularFirestore.collection('/inventory/', ref => ref
          .where('type', '==', 'Snorkel')
          .where('number', '==', this.newInventoryItem.number)).ref.onSnapshot(snapShot => {
            if (snapShot.size === 0) {
              this.angularFirestore.collection('inventory').add(this.newInventoryItem);
              alert('Snorkel added');
            } else {
              alert('Snorkel number already exists');
            }
          });
        break;

      case 'Glove':
        this.angularFirestore.collection('/inventory/', ref => ref
          .where('type', '==', 'Glove')
          .where('number', '==', this.newInventoryItem.number)).ref.get().then(snapShot => {
            if (snapShot.size === 0) {
              this.angularFirestore.collection('inventory').add(this.newInventoryItem);
              alert('Glove added');
            } else {
              alert('Glove number already exists');
            }
          });
        break;

      case 'Stick':
        this.angularFirestore.collection('/inventory/', ref => ref
          .where('type', '==', 'Stick')
          .where('number', '==', this.newInventoryItem.number)).ref.get().then(snapShot => {
            if (snapShot.size === 0) {
              this.angularFirestore.collection('inventory').add(this.newInventoryItem);
              alert('Stick added');
            } else {
              alert('Stick number already exists');
            }
          });
        break;

      case 'Fins':
        this.angularFirestore.collection('/inventory/', ref => ref
          .where('type', '==', 'Fins')
          .where('number', '==', this.newInventoryItem.number)).ref.get().then(snapShot => {
            if (snapShot.size === 0) {
              this.angularFirestore.collection('inventory').add(this.newInventoryItem);
              alert('Fins added');
            } else {
              alert('Fins number already exists');
            }
          });
        break;

      default:
        break;
    }

    this.newInventoryItem = {} as InventoryItem;
  }

  displayInventoryDetail(selectedInventoryItem: InventoryItem) {
    this.toggleShowDetail();

    this.store.dispatch(new inventoryActions.GetSelectedInventoryItemSuccess(selectedInventoryItem));
  }

  sliceAppState() {
    this.store.select(inventorySelectors.inventoryItems).subscribe(inventoryItems => {
      this.inventoryItems = inventoryItems;
      this.inventoryItems.sort((a, b) => (a.number > b.number) ? 1 : -1);
    });

    this.store.select(inventorySelectors.selectedInventoryItem).subscribe(selectedInventoryItem => {
      this.selectedInventoryItem = selectedInventoryItem;
    });
  }

  ngOnInit() {
    this.sliceAppState();
  }

}
