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
      this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
      this.store.dispatch(new playersActions.RequestGetPlayersByGender(navItemCont, navItem));
    }

    // switch (navItem) {
    //   case 'Players':
    //     $('#collapsePlayers').is('.collapse:not(.show)') ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U19':
    //     $('#collapseU19').is('.collapse:not(.show)') ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U19 Ladies':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U19 Men':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U15':
    //     $('#collapseU15').is('.collapse:not(.show)') ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U15 Ladies':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U15 Men':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U13':
    //     $('#collapseU13').is('.collapse:not(.show)') ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U13 Ladies':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U13 Men':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U10':
    //     $('#collapseU10').is('.collapse:not(.show)') ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U10 Ladies':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'U10 Men':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'Player Status':
    //     $('#collapsePlayerStatus').is('.collapse:not(.show)') ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'Active':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'Beginner':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'Interested':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'Inactive':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   case 'Add Player':
    //     this.activeNavItem !== navItem ? this.activeNavItem = navItem : this.activeNavItem = null;
    //     return;

    //   default:
    //     return;
    // }
  }

  ngOnInit() {
  }
}

export class NavLink {
  active: false;
  name: string;
}


