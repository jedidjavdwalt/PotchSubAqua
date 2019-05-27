import { Component, OnInit } from '@angular/core';
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
import { Rental } from 'src/app/models/Rental';
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

  players = [];
  selectedPlayer = null;

  inventoryItems = [];
  selectedInventoryItem = null;

  rentals = [];
  selectedRental = {} as Rental;
  availableMasks = [];
  availableSnorkels = [];
  availableGloves = [];
  availableSticks = [];
  availableFins = [];

  buttons = [
    {
      id: 'Players', secondary: [
        { id: 'Senior', tertiary: [{ id: 'Female' }, { id: 'Male' }] },
        { id: 'U19', tertiary: [{ id: 'Female' }, { id: 'Male' }] },
        { id: 'U15', tertiary: [{ id: 'Female' }, { id: 'Male' }] },
        { id: 'U13', tertiary: [{ id: 'Female' }, { id: 'Male' }] },
        { id: 'U10', tertiary: [{ id: 'Female' }, { id: 'Male' }] },
        { id: 'Add' },
      ]
    },
    {
      id: 'Inventory Items', secondary: [
        { id: 'Status', tertiary: [{ id: 'Available' }, { id: 'Rented' }] },
        { id: 'Inventory Item Type', tertiary: [{ id: 'Mask' }, { id: 'Snorkel' }, { id: 'Glove' }, { id: 'Stick' }, { id: 'Fins' }] },
        { id: 'Add' },
      ]
    },
    {
      id: 'Rentals', secondary: [
        { id: 'Action Required', tertiary: [{ id: 'Admin' }, { id: 'Player' }] },
        { id: 'Rental Type', tertiary: [{ id: 'Day' }, { id: 'Beginner' }, { id: 'Season' }] },
        { id: 'Add' },
      ]
    }
  ];

  constructor(
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
    private playersService: PlayersService,
    private inventoryService: InventoryService,
    private rentalsService: RentalsService,
  ) { }

  primaryClicked(btn: string) {
    this.primaryBtn = btn;
    this.secondaryBtn = undefined;
    this.tertiaryBtn = undefined;
  }

  secondaryClicked(btn: string) {
    this.secondaryBtn = btn;
    this.tertiaryBtn = undefined;

    this.secondaryBtn === 'Add'
      ? this.displayAdd()
      : this.displayList();
  }

  tertiaryClicked(btn: string) {
    this.tertiaryBtn = btn;

    this.displayList();
  }

  shouldDisplayPlayersList() {
    if (this.primaryBtn === 'Players' && this.secondaryBtn && this.secondaryBtn !== 'Add') {
      return true;
    }

    return false;
  }

  shouldDisplayInventoryItemsList() {
    if (this.primaryBtn === 'Inventory Items' && this.secondaryBtn && this.secondaryBtn !== 'Add' && this.tertiaryBtn) {
      return true;
    }

    return false;
  }

  shouldDisplayRentalsList() {
    if (this.primaryBtn === 'Rentals' && this.secondaryBtn && this.secondaryBtn !== 'Add' && this.tertiaryBtn) {
      return true;
    }

    return false;
  }

  displayAdd() {
    if (this.primaryBtn === 'Players') {
      return 'Players';
    }

    if (this.primaryBtn === 'Inventory Items') {
      return 'Inventory Items';
    }

    if (this.primaryBtn === 'Rentals') {
      this.store.dispatch(new playersActions.RequestGetAllPlayers());
      this.store.dispatch(new inventoryActions.RequestGetAvailableMasks());
      this.store.dispatch(new inventoryActions.RequestGetAvailableSnorkels());
      this.store.dispatch(new inventoryActions.RequestGetAvailableGloves());
      this.store.dispatch(new inventoryActions.RequestGetAvailableSticks());
      this.store.dispatch(new inventoryActions.RequestGetAvailableFins());

      return 'Rentals';
    }
  }

  displayList() {
    if (this.primaryBtn === 'Players') {
      !this.tertiaryBtn
        ? this.store.dispatch(new playersActions.RequestGetPlayersByAgeGroup(this.secondaryBtn))
        : this.store.dispatch(new playersActions.RequestGetPlayersByGender(this.tertiaryBtn, this.secondaryBtn));

      return 'Players';
    }

    if (this.primaryBtn === 'Inventory Items' && this.tertiaryBtn) {
      this.secondaryBtn === 'Status'
        ? this.store.dispatch(new inventoryActions.RequestGetInventoryItemsByStatus(this.tertiaryBtn))
        : this.store.dispatch(new inventoryActions.RequestGetInventoryItemsByType(this.tertiaryBtn));

      return 'Inventory Items';
    }

    if (this.primaryBtn === 'Rentals' && this.tertiaryBtn) {
      this.secondaryBtn === 'Action Required'
        ? this.store.dispatch(new rentalsActions.RequestGetRentalsByActionRequired(this.tertiaryBtn))
        : this.store.dispatch(new rentalsActions.RequestGetRentalsByType(this.tertiaryBtn));

      return 'Rentals';
    }
  }

  displayPlayersDetail(selectedPlayer: Player) {
    this.store.dispatch(new playersActions.GetSelectedPlayerSuccess(selectedPlayer));
  }

  displayInventoryDetail(selectedInventoryItem: InventoryItem) {
    this.store.dispatch(new inventoryActions.GetSelectedInventoryItemSuccess(selectedInventoryItem));
  }

  displayRentalsDetail(selectedRental: Rental) {
    this.store.dispatch(new rentalsActions.GetSelectedRentalSuccess(selectedRental));
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
