import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import * as playersActions from '../../store/actions/players.actions';
import * as playersSelectors from '../../store/selectors/players.selectors';
import * as inventoryActions from '../../store/actions/inventory.actions';
import * as inventorySelectors from '../../store/selectors/inventory.selectors';
import * as rentalsActions from '../../store/actions/rentals.actions';
import * as rentalsSelectors from '../../store/selectors/rentals.selectors';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { Player } from 'src/app/models/Player';
import { Rental } from 'src/app/models/Rental';
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
  selectedRental = null;
  availableMasks = [];
  availableSnorkels = [];
  availableGloves = [];
  availableSticks = [];
  availableFins = [];

  buttons = [
    {
      id: 'Players',
      secondary: [
        { id: 'Senior', tertiary: [{ id: 'Female' }, { id: 'Male' }] },
        { id: 'U19', tertiary: [{ id: 'Female' }, { id: 'Male' }] },
        { id: 'U15', tertiary: [{ id: 'Female' }, { id: 'Male' }] },
        { id: 'U13', tertiary: [{ id: 'Female' }, { id: 'Male' }] },
        { id: 'U10', tertiary: [{ id: 'Female' }, { id: 'Male' }] },
        { id: 'Add' }
      ]
    },
    {
      id: 'Inventory Items',
      secondary: [
        { id: 'Status', tertiary: [{ id: 'Available' }, { id: 'Rented' }] },
        {
          id: 'Inventory Item Type',
          tertiary: [
            { id: 'Mask' },
            { id: 'Snorkel' },
            { id: 'Glove' },
            { id: 'Stick' },
            { id: 'Fins' }
          ]
        },
        { id: 'Add' }
      ]
    },
    {
      id: 'Rentals',
      secondary: [
        {
          id: 'Action Required',
          tertiary: [{ id: 'Admin' }, { id: 'Player' }]
        },
        {
          id: 'Rental Type',
          tertiary: [{ id: 'Day' }, { id: 'Beginner' }, { id: 'Season' }]
        },
        { id: 'Add' }
      ]
    }
  ];

  isEditing = false;

  constructor(
    private store: Store<AppState>,
    private rentalService: RentalsService
  ) { }

  primaryClicked(btn: string) {
    this.primaryBtn = btn;
    this.secondaryBtn = undefined;
    this.tertiaryBtn = undefined;

    switch (this.primaryBtn) {
      case 'Players':
        this.selectedInventoryItem = null;
        this.selectedRental = null;
        break;

      case 'Inventory Items':
        this.selectedPlayer = null;
        this.selectedRental = null;
        break;

      case 'Rentals':
        this.selectedPlayer = null;
        this.selectedInventoryItem = null;
        break;

      default:
        break;
    }
  }

  secondaryClicked(btn: string) {
    this.secondaryBtn = btn;
    this.tertiaryBtn = undefined;

    this.secondaryBtn === 'Add' ? this.displayAdd() : this.displayList();

    switch (this.secondaryBtn) {
      case 'Senior':
        this.selectedPlayer = null;
        break;

      case 'U19':
        this.selectedPlayer = null;
        break;

      case 'U15':
        this.selectedPlayer = null;
        break;

      case 'U13':
        this.selectedPlayer = null;
        break;

      case 'U10':
        this.selectedPlayer = null;
        break;

      case 'Add':
        this.selectedPlayer = null;
        this.selectedInventoryItem = null;
        this.selectedRental = null;
        break;

      case 'Status':
        this.selectedInventoryItem = null;
        break;

      case 'Inventory Item Type':
        this.selectedInventoryItem = null;
        break;

      case 'Action Required':
        this.selectedRental = null;
        break;

      case 'Rental Type':
        this.selectedRental = null;
        break;

      default:
        break;
    }
  }

  tertiaryClicked(btn: string) {
    this.tertiaryBtn = btn;

    this.displayList();

    switch (this.tertiaryBtn) {
      case 'Female':
        this.selectedPlayer = null;
        break;

      case 'Male':
        this.selectedPlayer = null;
        break;

      case 'Available':
        this.selectedInventoryItem = null;
        break;

      case 'Rented':
        this.selectedInventoryItem = null;
        break;

      case 'Mask':
        this.selectedInventoryItem = null;
        break;

      case 'Snorkel':
        this.selectedInventoryItem = null;
        break;

      case 'Glove':
        this.selectedInventoryItem = null;
        break;

      case 'Stick':
        this.selectedInventoryItem = null;
        break;

      case 'Fins':
        this.selectedInventoryItem = null;
        break;

      case 'Admin':
        this.selectedRental = null;
        break;

      case 'Player':
        this.selectedRental = null;
        break;

      case 'Day':
        this.selectedRental = null;
        break;

      case 'Beginner':
        this.selectedRental = null;
        break;

      case 'Season':
        this.selectedRental = null;
        break;

      default:
        break;
    }
  }

  shouldDisplayBody(): boolean {
    if (
      this.shouldDisplayPlayersAdd() ||
      this.shouldDisplayInventoryAdd() ||
      this.shouldDisplayRentalsAdd() ||
      this.shouldDisplayPlayersList() ||
      this.shouldDisplayInventoryList() ||
      this.shouldDisplayRentalsList() ||
      this.shouldDisplayPlayersDetail() ||
      this.shouldDisplayInventoryDetail() ||
      this.shouldDisplayRentalsDetail() ||
      this.shouldDisplayRentalsEdit()
    ) {
      return true;
    }

    return false;
  }

  shouldDisplayPlayersAdd(): boolean {
    if (this.primaryBtn === 'Players' && this.secondaryBtn === 'Add') {
      return true;
    }

    return false;
  }

  shouldDisplayInventoryAdd(): boolean {
    if (this.primaryBtn === 'Inventory Items' && this.secondaryBtn === 'Add') {
      return true;
    }

    return false;
  }

  shouldDisplayRentalsAdd(): boolean {
    if (this.primaryBtn === 'Rentals' && this.secondaryBtn === 'Add') {
      return true;
    }

    return false;
  }

  shouldDisplayPlayersList(): boolean {
    if (
      this.primaryBtn === 'Players' &&
      this.secondaryBtn &&
      this.secondaryBtn !== 'Add' &&
      !this.isEditing
    ) {
      return true;
    }

    return false;
  }

  shouldDisplayInventoryList(): boolean {
    if (
      this.primaryBtn === 'Inventory Items' &&
      this.secondaryBtn &&
      this.secondaryBtn !== 'Add' &&
      this.tertiaryBtn &&
      !this.isEditing
    ) {
      return true;
    }

    return false;
  }

  shouldDisplayRentalsList(): boolean {
    if (
      this.primaryBtn === 'Rentals' &&
      this.secondaryBtn &&
      this.secondaryBtn !== 'Add' &&
      this.tertiaryBtn &&
      !this.isEditing
    ) {
      return true;
    }

    return false;
  }

  shouldDisplayPlayersDetail(): boolean {
    if (this.selectedPlayer) {
      return true;
    }

    return false;
  }

  shouldDisplayInventoryDetail(): boolean {
    if (this.selectedInventoryItem) {
      return true;
    }

    return false;
  }

  shouldDisplayRentalsDetail(): boolean {
    if (this.selectedRental) {
      return true;
    }

    return false;
  }

  shouldDisplayRentalsEdit() {
    if (
      this.primaryBtn === 'Rentals' &&
      this.secondaryBtn &&
      this.secondaryBtn !== 'Add' &&
      this.tertiaryBtn &&
      this.isEditing
    ) {
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

      if (
        !this.availableMasks ||
        !this.availableMasks.length ||
        this.availableMasks.length === 0
      ) {
        this.store.dispatch(new inventoryActions.RequestGetAvailableMasks());
      }

      if (
        !this.availableSnorkels ||
        !this.availableSnorkels.length ||
        this.availableSnorkels.length === 0
      ) {
        this.store.dispatch(new inventoryActions.RequestGetAvailableSnorkels());
      }

      if (
        !this.availableGloves ||
        !this.availableGloves.length ||
        this.availableGloves.length === 0
      ) {
        this.store.dispatch(new inventoryActions.RequestGetAvailableGloves());
      }

      if (
        !this.availableSticks ||
        !this.availableSticks.length ||
        this.availableSticks.length === 0
      ) {
        this.store.dispatch(new inventoryActions.RequestGetAvailableSticks());
      }

      if (
        !this.availableFins ||
        !this.availableFins.length ||
        this.availableFins.length === 0
      ) {
        this.store.dispatch(new inventoryActions.RequestGetAvailableFins());
      }

      return 'Rentals';
    }
  }

  displayList() {
    if (this.primaryBtn === 'Players') {
      !this.tertiaryBtn
        ? this.store.dispatch(
          new playersActions.RequestGetPlayersByAgeGroup(this.secondaryBtn)
        )
        : this.store.dispatch(
          new playersActions.RequestGetPlayersByGender(
            this.tertiaryBtn,
            this.secondaryBtn
          )
        );

      return 'Players';
    }

    if (this.primaryBtn === 'Inventory Items' && this.tertiaryBtn) {
      this.secondaryBtn === 'Status'
        ? this.store.dispatch(
          new inventoryActions.RequestGetInventoryItemsByStatus(
            this.tertiaryBtn
          )
        )
        : this.store.dispatch(
          new inventoryActions.RequestGetInventoryItemsByType(
            this.tertiaryBtn
          )
        );

      return 'Inventory Items';
    }

    if (this.primaryBtn === 'Rentals' && this.tertiaryBtn) {
      this.secondaryBtn === 'Action Required'
        ? this.store.dispatch(
          new rentalsActions.RequestGetRentalsByActionRequired(
            this.tertiaryBtn
          )
        )
        : this.store.dispatch(
          new rentalsActions.RequestGetRentalsByType(this.tertiaryBtn)
        );

      return 'Rentals';
    }
  }

  displayPlayersDetail(selectedPlayer: Player) {
    this.store.dispatch(new playersActions.SetSelectedPlayer(selectedPlayer));
    this.store.dispatch(new inventoryActions.ClearSelectedInventoryItem());
    this.store.dispatch(new rentalsActions.ClearSelectedRental());
  }

  displayInventoryDetail(selectedInventoryItem: InventoryItem) {
    this.store.dispatch(
      new inventoryActions.SetSelectedInventoryItem(selectedInventoryItem)
    );
    this.store.dispatch(new playersActions.ClearSelectedPlayer());
    this.store.dispatch(new rentalsActions.ClearSelectedRental());
  }

  displayRentalsDetail(selectedRental: Rental) {
    this.store.dispatch(new rentalsActions.SetSelectedRental(selectedRental));
    this.store.dispatch(new playersActions.ClearSelectedPlayer());
    this.store.dispatch(new inventoryActions.ClearSelectedInventoryItem());
  }

  sliceAppState() {
    this.store.select(playersSelectors.players).subscribe(players => {
      this.players = players;
    });

    this.store
      .select(playersSelectors.selectedPlayer)
      .subscribe(selectedPlayer => {
        this.selectedPlayer = selectedPlayer;
      });

    this.store
      .select(inventorySelectors.inventoryItems)
      .subscribe(inventoryItems => {
        this.inventoryItems = inventoryItems;
        this.inventoryItems.sort((a, b) => (a.number > b.number ? 1 : -1));
      });

    this.store
      .select(inventorySelectors.selectedInventoryItem)
      .subscribe(selectedInventoryItem => {
        this.selectedInventoryItem = selectedInventoryItem;
      });

    this.store.select(rentalsSelectors.rentals).subscribe(rentals => {
      this.rentals = rentals;
    });

    this.store
      .select(rentalsSelectors.selectedRental)
      .subscribe(selectedRental => {
        this.selectedRental = selectedRental;
      });

    this.store
      .select(inventorySelectors.availableMasks)
      .subscribe(availableMasks => {
        this.availableMasks = availableMasks;
      });

    this.store
      .select(inventorySelectors.availableSnorkels)
      .subscribe(availableSnorkels => {
        this.availableSnorkels = availableSnorkels;
      });

    this.store
      .select(inventorySelectors.availableGloves)
      .subscribe(availableGloves => {
        this.availableGloves = availableGloves;
      });

    this.store
      .select(inventorySelectors.availableSticks)
      .subscribe(availableSticks => {
        this.availableSticks = availableSticks;
      });

    this.store
      .select(inventorySelectors.availableFins)
      .subscribe(availableFins => {
        this.availableFins = availableFins;
      });
  }

  ngOnInit() {
    this.sliceAppState();
    // this.rentalService.getRentalsToCheck();
  }
}
