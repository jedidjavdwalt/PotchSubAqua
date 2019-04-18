import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import * as inventoryActions from '../../store/actions/inventory.actions';
import * as inventorySelectors from '../../store/selectors/inventory.selectors';
import * as playersActions from '../../store/actions/players.actions';
import * as playersSelectors from '../../store/selectors/players.selectors';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from 'src/app/models/Player';

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
  selectedInventoryItem = {} as InventoryItem;
  newInventoryItem = {} as InventoryItem;
  // shouldShowInventoryList = false;
  // shouldShowInventoryDetail = false;
  shouldShowInventoryAdd = false;

  players = [];
  selectedPlayer = {} as Player;
  newPlayers = {} as Player;
  shouldShowPlayersAdd = false;

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

  // toggleShowList() {
  //   this.shouldShowInventoryList = true;
  //   this.shouldShowInventoryDetail = false;
  //   this.shouldShowInventoryAdd = false;
  // }

  // toggleShowAdd() {
  //   this.shouldShowInventoryList = false;
  //   this.shouldShowInventoryDetail = false;
  //   this.shouldShowInventoryAdd = true;
  // }

  // toggleShowDetail() {
  //   this.shouldShowInventoryList = false;
  //   this.shouldShowInventoryDetail = true;
  //   this.shouldShowInventoryAdd = false;
  // }

  displayPlayersList() {
    this.secondaryBtn === 'U19' || this.secondaryBtn === 'U15' || this.secondaryBtn === 'U13'
      ? this.store.dispatch(new playersActions.RequestGetPlayersByGender(this.tertiaryBtn))
      : this.store.dispatch(new playersActions.RequestGetPlayersByAgeGroup(this.secondaryBtn));
  }

  displayPlayersAdd() {
    this.shouldShowInventoryAdd = true;
  }

  clickAddPlayers() {
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

  addPlayers() {
    this.angularFirestore.collection('/inventory/').ref.where('type', '==', this.newInventoryItem.type)
      .where('number', '==', this.newInventoryItem.number).get().then(snapShot => {
        if (snapShot.size === 0) {
          this.angularFirestore.collection('inventory').add(this.newInventoryItem);
          alert(this.newInventoryItem.type + ' added');
        } else {
          alert(this.newInventoryItem.type + ' number already exists');
        }
      });
  }

  displayPlayersDetail() {
    alert('displayPlayersDetail');
  }

  displayInventoryList() {
    this.secondaryBtn === 'Status'
      ? this.store.dispatch(new inventoryActions.RequestGetInventoryItemsByStatus(this.tertiaryBtn))
      : this.store.dispatch(new inventoryActions.RequestGetInventoryItemsByType(this.tertiaryBtn));
  }

  displayInventoryAdd() {
    this.shouldShowInventoryAdd = true;
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
    this.angularFirestore.collection('/inventory/').ref.where('type', '==', this.newInventoryItem.type)
      .where('number', '==', this.newInventoryItem.number).get().then(snapShot => {
        if (snapShot.size === 0) {
          this.angularFirestore.collection('inventory').add(this.newInventoryItem);
          alert(this.newInventoryItem.type + ' added');
        } else {
          alert(this.newInventoryItem.type + ' number already exists');
        }
      });
  }

  displayInventoryDetail(selectedInventoryItem: InventoryItem) {
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
