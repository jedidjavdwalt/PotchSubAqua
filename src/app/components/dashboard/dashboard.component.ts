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

  activeNavItem: string = null;

  constructor() {
  }

  clickNavItem(navItem: string) {
    this.activeNavItem === navItem ? this.activeNavItem = null : this.activeNavItem = navItem;

    // switch (this.activeNavItem) {
    //   case 'Players':

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


