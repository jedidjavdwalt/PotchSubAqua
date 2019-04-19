import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/actions/players.actions';
import * as playersSelectors from '../../store/selectors/players.selectors';
import * as inventoryActions from '../../store/actions/inventory.actions';
import * as inventorySelectors from '../../store/selectors/inventory.selectors';
import * as rentalsActions from '../../store/actions/rentals.actions';
import * as rentalsSelectors from '../../store/selectors/rentals.selectors';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from 'src/app/models/Player';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { Rental } from 'src/app/models/Rental';

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
  selectedInventoryItem = null;
  newInventoryItem = {} as InventoryItem;
  shouldShowInventoryList = false;
  shouldShowInventoryDetail = false;
  shouldShowInventoryAdd = false;

  players = [];
  selectedPlayer = null;
  newPlayer = {} as Player;
  selectedBirthDate: string;
  shouldShowPlayersList = false;
  shouldShowPlayersDetail = false;
  shouldShowPlayersAdd = false;

  rentals = [];
  selectedRental = null;
  newRental = {} as Rental;
  shouldShowRentalsList = false;
  shouldShowRentalsDetail = false;
  shouldShowRentalsAdd = false;

  availableMasks = [];
  availableSnorkels = [];
  availableGloves = [];
  availableSticks = [];
  availableFins = [];

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
  ) { }

  activatePrimaryBtn(btn: string) {
    this.primaryBtn = btn;
    this.secondaryBtn = undefined;
    this.tertiaryBtn = undefined;

    this.toggleAllOff();
  }

  activateSecondaryBtn(btn: string) {
    this.secondaryBtn = btn;
    this.tertiaryBtn = undefined;
  }

  activateTertiaryBtn(btn: string) {
    this.tertiaryBtn = btn;
  }

  toggleAllOff() {
    this.shouldShowPlayersList = false;
    this.shouldShowInventoryList = false;
    this.shouldShowRentalsList = false;

    this.shouldShowPlayersDetail = false;
    this.shouldShowInventoryDetail = false;
    this.shouldShowRentalsDetail = false;

    this.shouldShowPlayersAdd = false;
    this.shouldShowInventoryAdd = false;
    this.shouldShowRentalsAdd = false;
  }

  toggleAddOff() {
    this.shouldShowPlayersAdd = false;
    this.shouldShowInventoryAdd = false;
    this.shouldShowRentalsAdd = false;
  }

  toggleDetailOff() {
    this.shouldShowPlayersDetail = false;
    this.shouldShowInventoryDetail = false;
    this.shouldShowRentalsDetail = false;
  }

  toggleShowPlayersList() {
    this.shouldShowPlayersList = true;
    this.shouldShowInventoryList = false;
    this.shouldShowRentalsList = false;
  }

  toggleShowInventoryList() {
    this.shouldShowPlayersList = false;
    this.shouldShowInventoryList = true;
    this.shouldShowRentalsList = false;
  }

  toggleShowRentalsList() {
    this.shouldShowPlayersList = false;
    this.shouldShowInventoryList = false;
    this.shouldShowRentalsList = true;
  }

  toggleShowPlayersDetail() {
    this.shouldShowPlayersDetail = true;
    this.shouldShowInventoryDetail = false;
    this.shouldShowRentalsDetail = false;

    this.toggleAddOff();
  }

  toggleShowInventoryDetail() {
    this.shouldShowPlayersDetail = false;
    this.shouldShowInventoryDetail = true;
    this.shouldShowRentalsDetail = false;

    this.toggleAddOff();
  }

  toggleShowRentalDetail() {
    this.shouldShowPlayersDetail = false;
    this.shouldShowInventoryDetail = false;
    this.shouldShowRentalsDetail = true;

    this.toggleAddOff();
  }

  toggleShowPlayersAdd() {
    this.shouldShowPlayersAdd = true;
    this.shouldShowInventoryAdd = false;
    this.shouldShowRentalsAdd = false;

    this.toggleDetailOff();
  }

  toggleShowInventoryAdd() {
    this.shouldShowPlayersAdd = false;
    this.shouldShowInventoryAdd = true;
    this.shouldShowRentalsAdd = false;

    this.toggleDetailOff();
  }

  toggleShowRentalsAdd() {
    this.shouldShowPlayersAdd = false;
    this.shouldShowInventoryAdd = false;
    this.shouldShowRentalsAdd = true;

    this.toggleDetailOff();
  }

  displayPlayersList() {
    !this.tertiaryBtn
      ? this.store.dispatch(new playersActions.RequestGetPlayersByAgeGroup(this.secondaryBtn))
      : this.store.dispatch(new playersActions.RequestGetPlayersByGender(this.tertiaryBtn, this.secondaryBtn));

    this.toggleShowPlayersList();
  }

  displayPlayersDetail(selectedPlayer: Player) {
    this.store.dispatch(new playersActions.GetSelectedPlayerSuccess(selectedPlayer));
    this.toggleShowPlayersDetail();
  }

  displayPlayersAdd() {
    this.toggleShowPlayersAdd();
  }

  clickAddPlayers() {
    this.newPlayer.birthDate = this.convertDateToTimestamp(this.selectedBirthDate);
    this.calculateAgeGroup();

    if (!this.newPlayer.player ||
      !this.newPlayer.gender ||
      isNaN(this.newPlayer.birthDate.seconds) ||
      !this.newPlayer.ageGroup ||
      !this.newPlayer.parent) {
      alert('You forgot to fill in some fields');
    } else if (!this.newPlayer.playerCell &&
      !this.newPlayer.parentCell) {
      alert('You forgot to fill in a cell number');
    } else {
      this.newPlayer.id = this.newPlayer.player.replace('', '_');
      this.addPlayers();
    }
  }

  // convertDateToTimestamp() {
  //   const date = new Date(this.selectedBirthDate);
  //   this.newPlayer.birthDate = firebase.firestore.Timestamp.fromDate(date);
  // }

  calculateAgeGroup() {
    const currentYear = moment().year();
    const firstDayOfYear = moment(`${currentYear}-01-01`);
    const selectedBirthDate = moment(this.selectedBirthDate);
    const age = firstDayOfYear.diff(selectedBirthDate, 'years');

    age <= 18 && age > 15
      ? this.newPlayer.ageGroup = 'U19'
      : age <= 15 && age > 13
        ? this.newPlayer.ageGroup = 'U15'
        : age <= 13 && age > 10
          ? this.newPlayer.ageGroup = 'U13'
          : age <= 10
            ? this.newPlayer.ageGroup = 'U10'
            : this.newPlayer.ageGroup = 'Senior';
  }

  addPlayers() {
    this.angularFirestore.collection('/players/').ref.where('player', '==', this.newPlayer.player).get().then(snapShot => {
      if (snapShot.size === 0) {
        this.angularFirestore.collection('/players/').doc(this.newPlayer.id).set(this.newPlayer);
        alert(this.newPlayer.player + ' added');
      } else {
        alert(this.newPlayer.player + ' already exists');
      }
    });
  }

  displayInventoryList() {
    this.secondaryBtn === 'Status'
      ? this.store.dispatch(new inventoryActions.RequestGetInventoryItemsByStatus(this.tertiaryBtn))
      : this.store.dispatch(new inventoryActions.RequestGetInventoryItemsByType(this.tertiaryBtn));

    this.toggleShowInventoryList();
  }

  displayInventoryAdd() {
    this.toggleShowInventoryAdd();
  }

  displayInventoryDetail(selectedInventoryItem: InventoryItem) {
    this.store.dispatch(new inventoryActions.GetSelectedInventoryItemSuccess(selectedInventoryItem));
    this.toggleShowInventoryDetail();
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
      this.newInventoryItem.id = this.newInventoryItem.number + '_' + this.newInventoryItem.brand + '_' + this.newInventoryItem.type;
      this.addInventory();
    }
  }

  addInventory() {
    this.angularFirestore.collection('/inventory/').ref.where('type', '==', this.newInventoryItem.type)
      .where('number', '==', this.newInventoryItem.number).get().then(snapShot => {
        if (snapShot.size === 0) {
          this.angularFirestore.collection('inventory').doc(this.newInventoryItem.id).set(this.newInventoryItem);
          alert(this.newInventoryItem.type + ' added');
        } else {
          alert(this.newInventoryItem.type + ' number already exists');
        }
      });
  }

  displayRentalsAdd() {
    this.store.dispatch(new playersActions.RequestGetAllPlayers());
    this.store.dispatch(new inventoryActions.RequestGetAvailableMasks());
    this.store.dispatch(new inventoryActions.RequestGetAvailableSnorkels());
    this.store.dispatch(new inventoryActions.RequestGetAvailableGloves());
    this.store.dispatch(new inventoryActions.RequestGetAvailableSticks());
    this.store.dispatch(new inventoryActions.RequestGetAvailableFins());
    this.toggleShowRentalsAdd();
  }

  selectRentalInventoryItem(selectedRentalInventoryItem: string) {
    this.newRental.inventoryItems.push(selectedRentalInventoryItem);
  }

  clickAddRentals() {
    // this.convertDateToTimestamp();
    // this.calculateAgeGroup();

    // if (!this.newPlayer.player ||
    //   !this.newPlayer.gender ||
    //   isNaN(this.newPlayer.birthDate.seconds) ||
    //   !this.newPlayer.ageGroup ||
    //   !this.newPlayer.parent) {
    //   alert('You forgot to fill in some fields');
    // } else if (!this.newPlayer.playerCell &&
    //   !this.newPlayer.parentCell) {
    //   alert('You forgot to fill in a cell number');
    // } else {
    //   this.addPlayers();
    // }
  }

  convertDateToTimestamp(stringToConvert: string) {
    return firebase.firestore.Timestamp.fromDate(new Date(stringToConvert));
  }

  calculateDueDate() {
    // const currentYear = moment().year();
    // const firstDayOfYear = moment(`${currentYear}-01-01`);
    // const selectedBirthDate = moment(this.selectedBirthDate);
    // const age = firstDayOfYear.diff(selectedBirthDate, 'years');

    // age <= 18 && age > 15
    //   ? this.newPlayer.ageGroup = 'U19'
    //   : age <= 15 && age > 13
    //     ? this.newPlayer.ageGroup = 'U15'
    //     : age <= 13 && age > 10
    //       ? this.newPlayer.ageGroup = 'U13'
    //       : age <= 10
    //         ? this.newPlayer.ageGroup = 'U10'
    //         : this.newPlayer.ageGroup = 'Senior';
  }

  addRentals() {
    this.angularFirestore.collection('/rentals/').ref
      .where('player', '==', this.newRental.player)
      .where('inventoryItems', '==', this.newRental.inventoryItems).get().then(snapShot => {
      if (snapShot.size === 0) {
        this.angularFirestore.collection('/rentals/').doc(this.newRental.id).set(this.newRental);
        alert('Rental added');
      } else {
        alert('Rental already exists');
      }
    });
  }

  sliceAppState() {
    this.store.select(inventorySelectors.inventoryItems).subscribe(inventoryItems => {
      this.inventoryItems = inventoryItems;
      this.inventoryItems.sort((a, b) => (a.number > b.number) ? 1 : -1);
    });

    this.store.select(inventorySelectors.selectedInventoryItem).subscribe(selectedInventoryItem => {
      this.selectedInventoryItem = selectedInventoryItem;
    });

    this.store.select(playersSelectors.players).subscribe(players => {
      this.players = players;
    });

    this.store.select(playersSelectors.selectedPlayer).subscribe(selectedPlayer => {
      this.selectedPlayer = selectedPlayer;
    });

    this.store.select(inventorySelectors.availableMasks).subscribe(availableMasks => {
      this.availableMasks = availableMasks;
    });

    this.store.select(inventorySelectors.availableSnorkels).subscribe(availableSnorkels => {
      this.availableSnorkels = availableSnorkels;
    });

    this.store.select(inventorySelectors.availableGloves).subscribe(availableGloves => {
      this.availableGloves = availableGloves;
    });

    this.store.select(inventorySelectors.availableSticks).subscribe(availableSticks => {
      this.availableSticks = availableSticks;
    });

    this.store.select(inventorySelectors.availableFins).subscribe(availableFins => {
      this.availableFins = availableFins;
    });
  }

  ngOnInit() {
    this.sliceAppState();
  }

}
