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
import * as moment from 'moment';
import { UpdateService } from 'src/app/services/update/update.service';
import { Router } from '@angular/router';
import * as usersActions from '../../store/actions/users.actions';
import * as usersSelectors from '../../store/selectors/users.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  activeNavItem = 'Players';
  expandedNavItem = null;

  players = [];

  constructor(
    private store: Store<AppState>,
  ) { }

  logoutClicked() {
    this.store.dispatch(new usersActions.RemoveUser());
    this.store.dispatch(new usersActions.LogoutUser());
  }

  playersNavLinkClicked(navLink: string, navItemCont?: string) {
    if (navLink === 'Players') {
      $(`#collapsePlayers`).is('.collapse:not(.show)') ? this.activeNavItem = navLink : this.activeNavItem = null;
    }

    if (
      !navItemCont &&
      navLink === 'U19' ||
      navLink === 'U15' ||
      navLink === 'U13' ||
      navLink === 'U10'
    ) {
      $(`#collapse${navLink}`).is('.collapse:not(.show)') ? this.activeNavItem = navLink : this.activeNavItem = null;
      this.store.dispatch(new playersActions.RequestGetPlayersByAgeGroup(navLink));
    }

    if (navItemCont) {
      if (this.activeNavItem === `${navLink} ${navItemCont}`) {
        return;
      }
      this.activeNavItem = `${navLink} ${navItemCont}`;
      this.store.dispatch(new playersActions.RequestGetPlayersByGender(navItemCont, navLink));
    }

    if (navLink === 'Player Status') {
      $(`#collapsePlayerStatus`).is('.collapse:not(.show)') ? this.activeNavItem = navLink : this.activeNavItem = null;
    }

    if (
      navLink === 'Active' ||
      navLink === 'Beginner' ||
      navLink === 'Interested' ||
      navLink === 'Inactive'
    ) {
      if (this.activeNavItem === navLink) {
        return;
      }
      this.activeNavItem = navLink;
      this.store.dispatch(new playersActions.RequestGetPlayersByStatus(this.activeNavItem));
    }

    if (navLink === 'Add Player') {
      this.activeNavItem = navLink;
    }
  }

  inventoryNavLinkClicked(navLink: string) {
    if (navLink === 'Inventory') {
      $(`#collapseInventory`).is('.collapse:not(.show)') ? this.activeNavItem = navLink : this.activeNavItem = null;
    }

    if (navLink === 'Inventory Type') {
      $(`#collapseInventoryType`).is('.collapse:not(.show)') ? this.activeNavItem = navLink : this.activeNavItem = null;
    }

    if (navLink === 'Inventory Status') {
      $(`#collapseInventoryStatus`).is('.collapse:not(.show)') ? this.activeNavItem = navLink : this.activeNavItem = null;
    }

    if (
      navLink === 'Mask' ||
      navLink === 'Snorkel' ||
      navLink === 'Glove' ||
      navLink === 'Stick' ||
      navLink === 'Fins'
    ) {
      if (this.activeNavItem === navLink) {
        return;
      }
      this.activeNavItem = navLink;
      this.store.dispatch(new inventoryActions.RequestGetInventoryItemsByType(this.activeNavItem));
    }

    if (
      navLink === 'Available' ||
      navLink === 'Rented'
    ) {
      if (this.activeNavItem === navLink) {
        return;
      }
      this.activeNavItem = navLink;
      this.store.dispatch(new inventoryActions.RequestGetInventoryItemsByStatus(this.activeNavItem));
    }

    if (navLink === 'Add Inventory') {
      this.activeNavItem = navLink;
    }
  }

  rentalsNavLinkClicked(navLink: string) {
    if (navLink === 'Rentals') {
      $(`#collapseRentals`).is('.collapse:not(.show)') ? this.activeNavItem = navLink : this.activeNavItem = null;
    }

    if (navLink === 'Action Required') {
      $(`#collapseActionRequired`).is('.collapse:not(.show)') ? this.activeNavItem = navLink : this.activeNavItem = null;
    }

    if (navLink === 'Rental Type') {
      $(`#collapseRentalType`).is('.collapse:not(.show)') ? this.activeNavItem = navLink : this.activeNavItem = null;
    }

    if (
      navLink === 'Admin' ||
      navLink === 'Player'
    ) {
      if (this.activeNavItem === navLink) {
        return;
      }
      this.activeNavItem = navLink;
      this.store.dispatch(new rentalsActions.RequestGetRentalsByActionRequired(this.activeNavItem));
    }

    if (
      navLink === 'Day' ||
      navLink === 'Beginner' ||
      navLink === 'Season'
    ) {
      if (this.activeNavItem === navLink) {
        return;
      }
      this.activeNavItem = navLink;
      this.store.dispatch(new rentalsActions.RequestGetRentalsByType(this.activeNavItem));
    }

    if (navLink === 'Add Rental') {
      this.activeNavItem = navLink;
    }
  }

  ngOnInit() {
  }
}

export class NavLink {
  active: false;
  name: string;
}


