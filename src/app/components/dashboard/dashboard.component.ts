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
  newRental = {} as Rental;
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
    this.newRental.inventoryItems = [];

    this.store.dispatch(new playersActions.RequestGetAllPlayers());
    this.store.dispatch(new inventoryActions.RequestGetAvailableMasks());
    this.store.dispatch(new inventoryActions.RequestGetAvailableSnorkels());
    this.store.dispatch(new inventoryActions.RequestGetAvailableGloves());
    this.store.dispatch(new inventoryActions.RequestGetAvailableSticks());
    this.store.dispatch(new inventoryActions.RequestGetAvailableFins());
    this.newRental.inventoryItems = [];

    this.toggleShowRentalsAdd();
  }

  clickAddRentals() {
    if (!this.newRental.player ||
      !this.newRental.type) {
      alert('You forgot to select a player or type');
    } else if (!this.selectedRentalMask &&
      !this.selectedRentalSnorkel &&
      !this.selectedRentalGlove &&
      !this.selectedRentalStick &&
      !this.selectedRentalFins) {
      alert('You forgot to select any inventory items');
    } else {
      this.newRental.dateKitOut = this.calculateDateKitOut();
      this.newRental.dateKitDue = this.calculateDateKitDue(this.newRental.type);
      this.newRental.feeDue = this.calculateFeeDue(this.newRental.type);
      if (this.selectedRentalMask) {
        this.newRental.inventoryItems.push(this.selectedRentalMask);
      }
      if (this.selectedRentalSnorkel) {
        this.newRental.inventoryItems.push(this.selectedRentalSnorkel);
      }
      if (this.selectedRentalGlove) {
        this.newRental.inventoryItems.push(this.selectedRentalGlove);
      }
      if (this.selectedRentalStick) {
        this.newRental.inventoryItems.push(this.selectedRentalStick);
      }
      if (this.selectedRentalFins) {
        this.newRental.inventoryItems.push(this.selectedRentalFins);
      }
      this.newRental.id = this.calculateId(moment().format().slice(0, 10) + '_' + this.newRental.player);
      this.newRental.actionRequired = this.calculateActionRequired(this.newRental);
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

  calculateActionRequired(rental: Rental) {
    let actionRequired: string;
    const currentDate = moment();
    const dateKitDue = moment(rental.dateKitDue.toDate());

    if (rental.type === 'Day') {
      if (rental.feePaid !== rental.feeDue) {
        actionRequired = 'Player';
      } else if (!rental.dateKitIn && currentDate > dateKitDue) {
        actionRequired = 'Player';
      } else {
        actionRequired = 'None';
      }
    } else {
      if (rental.feePaid !== rental.feeDue) {
        if (rental.dateKitIn) {
          actionRequired = 'None';
        } else {
          actionRequired = 'Player';
        }
      } else if (!rental.dateKitIn && currentDate > dateKitDue) {
        actionRequired = 'Player';
      } else if (rental.dateKitIn && !rental.feeReturned) {
        actionRequired = 'Admin';
      } else {
        actionRequired = 'None';
      }
    }

    return actionRequired;
  }

  addRentals() {
    this.angularFirestore.collection('/rentals/').doc(this.newRental.id).get().subscribe(snapShot => {
      if (!snapShot.exists) {
        this.angularFirestore.collection('/rentals/').doc(this.newRental.id).set(this.newRental);
        alert('Rental added');
        this.newRental = {} as Rental;
      } else {
        alert('Rental already exists');
      }
    });

    this.newRental.inventoryItems.forEach(inventoryItem => {
      this.angularFirestore.collection('/inventory/', ref => ref.where('rentalId', '==', inventoryItem)).get().subscribe(snapShot => {
        if (snapShot.size === 1) {
          this.inventoryItem = new InventoryItem(snapShot.docs[0].data() as InventoryItemData);
          this.inventoryItem.status = 'Rented';
          this.angularFirestore.collection('/inventory/').doc(this.inventoryItem.id).update(this.inventoryItem.toData());
          if (this.inventoryItem.type === 'Mask') {
            this.store.dispatch(new inventoryActions.RequestGetAvailableMasks());
          } else if (this.inventoryItem.type === 'Snorkel') {
            this.store.dispatch(new inventoryActions.RequestGetAvailableSnorkels());
          } else if (this.inventoryItem.type === 'Glove') {
            this.store.dispatch(new inventoryActions.RequestGetAvailableGloves());
          } else if (this.inventoryItem.type === 'Stick') {
            this.store.dispatch(new inventoryActions.RequestGetAvailableSticks());
          } else if (this.inventoryItem.type === 'Fins') {
            this.store.dispatch(new inventoryActions.RequestGetAvailableFins());
          }
          alert(this.inventoryItem.displayId + ' status updated');
          this.inventoryItem = {} as InventoryItem;
        } else if (snapShot.size === 0) {
          alert(inventoryItem + ' not found');
          return;
        } else if (snapShot.size < 1) {
          alert('More than one ' + inventoryItem);
        }
      });
    });
  }

  displayRentalsEdit() {
    this.newRental = new Rental(Object.assign({}, this.selectedRental));
    // this.newRental = this.selectedRental;

    this.newRental.inventoryItems.forEach(inventoryItem => {
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

    this.newRental.inventoryItems = [];

    this.dateKitOut = this.newRental.dateKitOut.toDate().toString().slice(0, 15);
    this.dateKitDue = this.newRental.dateKitDue.toDate().toString().slice(0, 15);

    this.store.dispatch(new inventoryActions.RequestGetAvailableMasks());
    this.store.dispatch(new inventoryActions.RequestGetAvailableSnorkels());
    this.store.dispatch(new inventoryActions.RequestGetAvailableGloves());
    this.store.dispatch(new inventoryActions.RequestGetAvailableSticks());
    this.store.dispatch(new inventoryActions.RequestGetAvailableFins());

    this.toggleShowRentalsEdit();
  }

  clickRentalsSaveEdit() {
    if (this.selectedRentalMask) {
      this.newRental.inventoryItems.push(this.selectedRentalMask);
    }
    if (this.selectedRentalSnorkel) {
      this.newRental.inventoryItems.push(this.selectedRentalSnorkel);
    }
    if (this.selectedRentalGlove) {
      this.newRental.inventoryItems.push(this.selectedRentalGlove);
    }
    if (this.selectedRentalStick) {
      this.newRental.inventoryItems.push(this.selectedRentalStick);
    }
    if (this.selectedRentalFins) {
      this.newRental.inventoryItems.push(this.selectedRentalFins);
    }
    if (this.selectedDateKitIn) {
      this.newRental.dateKitIn = this.convertDateStringToTimestamp(this.selectedDateKitIn);
    }
    this.newRental.actionRequired = this.calculateActionRequired(this.newRental);

    this.rentalsSaveEdit();
  }

  rentalsSaveEdit() {
    if (this.newRental === this.selectedRental) {
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
    this.newRental = {} as Rental;

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
