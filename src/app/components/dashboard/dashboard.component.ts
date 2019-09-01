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

  clickNavItem(navItem: string, navItemCont?: string) {
    if (navItem === 'Players') {
      $('#collapsePlayers').is('.collapse:not(.show)') ? this.activeNavItem = navItem : this.activeNavItem = null;
    }

    if (
      !navItemCont &&
      navItem === 'U19' ||
      navItem === 'U15' ||
      navItem === 'U13' ||
      navItem === 'U10'
    ) {
      $(`#collapse${navItem}`).is('.collapse:not(.show)') ? this.activeNavItem = navItem : this.activeNavItem = null;
      this.store.dispatch(new playersActions.RequestGetPlayersByAgeGroup(navItem));
    }

    if (navItemCont) {
      if (this.activeNavItem === `${navItem} ${navItemCont}`) {
        return;
      }
      this.activeNavItem = `${navItem} ${navItemCont}`;
      this.store.dispatch(new playersActions.RequestGetPlayersByGender(navItemCont, navItem));
    }

    if (navItem === 'Player Status') {
      $(`#collapsePlayerStatus`).is('.collapse:not(.show)') ? this.activeNavItem = navItem : this.activeNavItem = null;
    }

    if (
      navItem === 'Active' ||
      navItem === 'Beginner' ||
      navItem === 'Interested' ||
      navItem === 'Inactive'
    ) {
      if (this.activeNavItem === navItem) {
        return;
      }
      this.activeNavItem = navItem;
      this.store.dispatch(new playersActions.RequestGetPlayersByStatus(this.activeNavItem));
    }

    if (navItem === 'Add Player') {
      this.activeNavItem = navItem;
    }
  }

  ngOnInit() {
  }
}

export class NavLink {
  active: false;
  name: string;
}


