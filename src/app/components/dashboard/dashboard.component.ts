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
import { InventoryItem, InventoryItemData } from 'src/app/models/InventoryItem';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from 'src/app/models/Player';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { Rental } from 'src/app/models/Rental';
import { Timestamp } from '@firebase/firestore-types';
import { PlayersService } from 'src/app/services/players/players.service';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { RentalsService } from 'src/app/services/rentals/rentals.service';

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
  inventoryItem: InventoryItem = {} as InventoryItem;
  shouldShowInventoryList = false;
  shouldShowInventoryDetail = false;
  shouldShowInventoryAdd = false;

  players = [];
  selectedPlayer = null;
  player: Player = {} as Player;
  selectedBirthDate: string;
  shouldShowPlayersList = false;
  shouldShowPlayersDetail = false;
  shouldShowPlayersAdd = false;

  rentals = [];
  selectedRental = {} as Rental;
  rental = {} as Rental;
  shouldShowRentalsList = false;
  shouldShowRentalsDetail = false;
  shouldShowRentalsAdd = false;
  shouldShowRentalsEdit = false;

  availableMasks = [];
  availableSnorkels = [];
  availableGloves = [];
  availableSticks = [];
  availableFins = [];

  selectedRentalMask = undefined;
  selectedRentalSnorkel = undefined;
  selectedRentalGlove = undefined;
  selectedRentalStick = undefined;
  selectedRentalFins = undefined;

  dateKitOut: string;
  dateKitDue: string;
  selectedDateKitIn: string;

  constructor(
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
    private playersService: PlayersService,
    private inventoryService: InventoryService,
    private rentalsService: RentalsService,
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

    this.toggleDetailOff();
    this.toggleAddOff();
    this.toggleEditOff();
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

  toggleEditOff() {
    this.shouldShowRentalsEdit = false;
  }

  toggleShowPlayersList() {
    this.shouldShowPlayersList = true;
    this.shouldShowInventoryList = false;
    this.shouldShowRentalsList = false;

    this.toggleEditOff();
  }

  toggleShowInventoryList() {
    this.shouldShowPlayersList = false;
    this.shouldShowInventoryList = true;
    this.shouldShowRentalsList = false;

    this.toggleEditOff();
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
    this.toggleEditOff();
  }

  toggleShowInventoryDetail() {
    this.shouldShowPlayersDetail = false;
    this.shouldShowInventoryDetail = true;
    this.shouldShowRentalsDetail = false;

    this.toggleAddOff();
    this.toggleEditOff();
  }

  toggleShowRentalDetail() {
    this.shouldShowPlayersDetail = false;
    this.shouldShowInventoryDetail = false;
    this.shouldShowRentalsDetail = true;

    this.toggleAddOff();
    this.toggleEditOff();
  }

  toggleShowPlayersAdd() {
    this.shouldShowPlayersAdd = true;
    this.shouldShowInventoryAdd = false;
    this.shouldShowRentalsAdd = false;

    this.toggleDetailOff();
    this.toggleEditOff();
  }

  toggleShowInventoryAdd() {
    this.shouldShowPlayersAdd = false;
    this.shouldShowInventoryAdd = true;
    this.shouldShowRentalsAdd = false;

    this.toggleDetailOff();
    this.toggleEditOff();
  }

  toggleShowRentalsAdd() {
    this.shouldShowPlayersAdd = false;
    this.shouldShowInventoryAdd = false;
    this.shouldShowRentalsAdd = true;

    this.toggleDetailOff();
    this.toggleEditOff();
  }

  toggleShowRentalsEdit() {
    this.shouldShowRentalsEdit = true;

    this.toggleDetailOff();
    this.toggleAddOff();
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

  clickAddPlayer() {
    alert(this.playersService.createPlayerToAdd(this.selectedBirthDate, this.player));
    this.player = {} as Player;
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
    alert(this.inventoryService.createInventoryItemToAdd(this.inventoryItem));
    this.inventoryItem = {} as InventoryItem;
  }

  displayRentalsList() {
    this.secondaryBtn === 'Action Required'
      ? this.store.dispatch(new rentalsActions.RequestGetRentalsByActionRequired(this.tertiaryBtn))
      : this.store.dispatch(new rentalsActions.RequestGetRentalsByType(this.tertiaryBtn));

    this.toggleShowRentalsList();
  }

  displayRentalsDetail(selectedRental: Rental) {
    this.store.dispatch(new rentalsActions.GetSelectedRentalSuccess(selectedRental));
    this.toggleShowRentalDetail();
  }

  displayRentalsAdd() {
    // this.newRental.inventoryItems = [];

    this.store.dispatch(new playersActions.RequestGetAllPlayers());
    this.store.dispatch(new inventoryActions.RequestGetAvailableMasks());
    this.store.dispatch(new inventoryActions.RequestGetAvailableSnorkels());
    this.store.dispatch(new inventoryActions.RequestGetAvailableGloves());
    this.store.dispatch(new inventoryActions.RequestGetAvailableSticks());
    this.store.dispatch(new inventoryActions.RequestGetAvailableFins());
    // this.newRental.inventoryItems = [];

    this.toggleShowRentalsAdd();
  }

  clickAddRentals() {
    if (this.selectedRentalMask) {
      this.rental.inventoryItems.push(this.selectedRentalMask);
    }
    if (this.selectedRentalSnorkel) {
      this.rental.inventoryItems.push(this.selectedRentalSnorkel);
    }
    if (this.selectedRentalGlove) {
      this.rental.inventoryItems.push(this.selectedRentalGlove);
    }
    if (this.selectedRentalStick) {
      this.rental.inventoryItems.push(this.selectedRentalStick);
    }
    if (this.selectedRentalFins) {
      this.rental.inventoryItems.push(this.selectedRentalFins);
    }

    this.rentalsService.createRentalToAdd(this.rental);

    this.rental = {} as Rental;
    this.selectedRentalMask = null;
    this.selectedRentalSnorkel = null;
    this.selectedRentalGlove = null;
    this.selectedRentalStick = null;
    this.selectedRentalFins = null;
  }

  displayRentalsEdit() {
    this.rental = new Rental(Object.assign({}, this.selectedRental));
    // this.newRental = this.selectedRental;

    this.rental.inventoryItems.forEach(inventoryItem => {
      inventoryItem.includes('Mask')
        ? this.selectedRentalMask = inventoryItem
        : inventoryItem.includes('Snorkel')
          ? this.selectedRentalSnorkel = inventoryItem
          : inventoryItem.includes('Glove')
            ? this.selectedRentalGlove = inventoryItem
            : inventoryItem.includes('Stick')
              ? this.selectedRentalStick = inventoryItem
              : inventoryItem.includes('Fins')
                ? this.selectedRentalFins = inventoryItem
                : alert('Inventory item does not contain known type');
    });

    this.rental.inventoryItems = [];

    this.dateKitOut = this.rental.startDate.toDate().toString().slice(0, 15);
    this.dateKitDue = this.rental.dueDate.toDate().toString().slice(0, 15);

    this.store.dispatch(new inventoryActions.RequestGetAvailableMasks());
    this.store.dispatch(new inventoryActions.RequestGetAvailableSnorkels());
    this.store.dispatch(new inventoryActions.RequestGetAvailableGloves());
    this.store.dispatch(new inventoryActions.RequestGetAvailableSticks());
    this.store.dispatch(new inventoryActions.RequestGetAvailableFins());

    this.toggleShowRentalsEdit();
  }

  clickRentalsSaveEdit() {
    if (this.selectedRentalMask) {
      this.rental.inventoryItems.push(this.selectedRentalMask);
    }
    if (this.selectedRentalSnorkel) {
      this.rental.inventoryItems.push(this.selectedRentalSnorkel);
    }
    if (this.selectedRentalGlove) {
      this.rental.inventoryItems.push(this.selectedRentalGlove);
    }
    if (this.selectedRentalStick) {
      this.rental.inventoryItems.push(this.selectedRentalStick);
    }
    if (this.selectedRentalFins) {
      this.rental.inventoryItems.push(this.selectedRentalFins);
    }
    if (this.selectedDateKitIn) {
      this.rental.endDate = this.convertDateStringToTimestamp(this.selectedDateKitIn);
    }
    this.rental.actionRequired = this.calculateActionRequired(this.rental);

    this.rentalsSaveEdit();
  }

  rentalsSaveEdit() {
    if (this.rental === this.selectedRental) {
      console.log('equals');

    }
    // this.angularFirestore.collection('/rentals/').doc(this.newRental.id).update(this.newRental);
    // alert('Rental added');

    // this.newRental.inventoryItems.forEach(inventoryItem => {
    //   this.angularFirestore.collection('/inventory/', ref => ref.where('rentalId', '==', inventoryItem)).get().subscribe(snapShot => {
    //     if (snapShot.size === 1) {
    //       this.newInventoryItem = new InventoryItem(snapShot.docs[0].data() as InventoryItemData);
    //       this.newInventoryItem.status = 'Rented';
    //       this.angularFirestore.collection('/inventory/').doc(this.newInventoryItem.id).update(this.newInventoryItem.toData());
    //       if (this.newInventoryItem.type === 'Mask') {
    //         this.store.dispatch(new inventoryActions.RequestGetAvailableMasks());
    //       } else if (this.newInventoryItem.type === 'Snorkel') {
    //         this.store.dispatch(new inventoryActions.RequestGetAvailableSnorkels());
    //       } else if (this.newInventoryItem.type === 'Glove') {
    //         this.store.dispatch(new inventoryActions.RequestGetAvailableGloves());
    //       } else if (this.newInventoryItem.type === 'Stick') {
    //         this.store.dispatch(new inventoryActions.RequestGetAvailableSticks());
    //       } else if (this.newInventoryItem.type === 'Fins') {
    //         this.store.dispatch(new inventoryActions.RequestGetAvailableFins());
    //       }
    //       alert(this.newInventoryItem.rentalId + ' status updated');
    //       this.newInventoryItem = {} as InventoryItem;
    //     } else if (snapShot.size === 0) {
    //       alert(inventoryItem + ' not found');
    //       return;
    //     } else if (snapShot.size < 1) {
    //       alert('More than one ' + inventoryItem);
    //     }
    //   });
    // });
  }

  clickRentalsCancelEdit() {
    this.rental = {} as Rental;

    this.dateKitOut = null;
    this.dateKitDue = null;

    this.toggleShowRentalDetail();
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

    this.store.select(rentalsSelectors.rentals).subscribe(rentals => {
      this.rentals = rentals;
    });

    this.store.select(rentalsSelectors.selectedRental).subscribe(selectedRental => {
      this.selectedRental = selectedRental;
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
