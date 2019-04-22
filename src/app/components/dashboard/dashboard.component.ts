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
import { Timestamp } from '@firebase/firestore-types';

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

  newRentalMask = undefined;
  newRentalSnorkel = undefined;
  newRentalGlove = undefined;
  newRentalStick = undefined;
  newRentalFins = undefined;

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
    this.newPlayer.birthDate = this.convertDateStringToTimestamp(this.selectedBirthDate);
    this.newPlayer.ageGroup = this.calculateAgeGroup(this.selectedBirthDate);

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
      this.newPlayer.id = this.calculateId(this.newPlayer.player);
      this.addPlayers();
    }
  }

  convertDateStringToTimestamp(stringToConvert: string) {
    return firebase.firestore.Timestamp.fromDate(new Date(stringToConvert));
  }

  calculateAgeGroup(selectedBirthDate: string) {
    const currentYear = moment().year();
    const firstDayOfYear = moment(`${currentYear}-01-01`);
    const convertedBirthDate = moment(selectedBirthDate);
    const age = firstDayOfYear.diff(convertedBirthDate, 'years');
    let ageGroup;

    age <= 18 && age > 15
      ? ageGroup = 'U19'
      : age <= 15 && age > 13
        ? ageGroup = 'U15'
        : age <= 13 && age > 10
          ? ageGroup = 'U13'
          : age <= 10
            ? ageGroup = 'U10'
            : ageGroup = 'Senior';

    return ageGroup;
  }

  calculateId(selectedStrings: string) {
    let newId = selectedStrings;

    while (newId.indexOf(' ') !== -1) {
      newId = newId.replace(' ', '_');
    }

    return newId;
  }

  addPlayers() {
    this.angularFirestore.collection('/players/').doc(this.newPlayer.id).get().subscribe(snapShot => {
      if (!snapShot.exists) {
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

  displayInventoryDetail(selectedInventoryItem: InventoryItem) {
    this.store.dispatch(new inventoryActions.GetSelectedInventoryItemSuccess(selectedInventoryItem));
    this.toggleShowInventoryDetail();
  }

  displayInventoryAdd() {
    this.toggleShowInventoryAdd();
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
      this.newInventoryItem.rentalId = this.newInventoryItem.number + '. ' + this.newInventoryItem.brand + ' ' + this.newInventoryItem.type;
      this.addInventory();
    }
  }

  addInventory() {
    this.angularFirestore.collection('/inventory/').doc(this.newInventoryItem.id).get().subscribe(snapShot => {
      if (!snapShot.exists) {
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

  clickAddRentals() {
    if (!this.newRental.player ||
      !this.newRental.type) {
      alert('You forgot to select a player or type')
    } else if (!this.newRentalMask &&
      !this.newRentalSnorkel &&
      !this.newRentalGlove &&
      !this.newRentalStick &&
      !this.newRentalFins) {
      alert('You forgot to select any inventory items');
    } else {
      this.newRental.dateKitOut = this.calculateDateKitOut();
      this.newRental.dateKitDue = this.calculateDateKitDue(this.newRental.type);
      this.newRental.feeDue = this.calculateFeeDue(this.newRental.type);
      !this.newRental.feePaid
        ? this.newRental.actionRequired = 'Player'
        : this.newRental.actionRequired = 'None';
      this.newRental.inventoryItems = [];
      if (this.newRentalMask) {
        this.newRental.inventoryItems.push(this.newRentalMask);
      }
      if (this.newRentalSnorkel) {
        this.newRental.inventoryItems.push(this.newRentalSnorkel);
      }
      if (this.newRentalGlove) {
        this.newRental.inventoryItems.push(this.newRentalGlove);
      }
      if (this.newRentalStick) {
        this.newRental.inventoryItems.push(this.newRentalStick);
      }
      if (this.newRentalFins) {
        this.newRental.inventoryItems.push(this.newRentalFins);
      }
      this.newRental.id = this.calculateId(moment().format().slice(0, 10) + '_' + this.newRental.player);
      this.addRentals();
    }
  }

  calculateDateKitOut() {
    return this.convertDateStringToTimestamp(moment().format());
  }

  calculateDateKitDue(newRentalType: string) {
    let dateKitDue = moment();
    const currentYear = moment().year();

    newRentalType === 'Day'
      ? dateKitDue.add(1, 'days')
      : newRentalType === 'Beginner'
        ? dateKitDue.add(1, 'months')
        : dateKitDue = moment(`${currentYear}-03-31`);

    return this.convertDateStringToTimestamp(dateKitDue.format());
  }

  calculateFeeDue(newRentalType: string) {
    let feeDue;

    newRentalType === 'Day'
      ? feeDue = 5
      : newRentalType === 'Beginner'
        ? feeDue = 250
        : feeDue = 500;

    return feeDue;
  }

  addRentals() {
    this.angularFirestore.collection('/rentals/').doc(this.newRental.id).get().subscribe(snapShot => {
      if (!snapShot.exists) {
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
