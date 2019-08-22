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

  playerNavLink = { active: false, name: 'Players' };
  u19NavLink = { active: false, name: 'U19' };
  u19WomenNavLink = { active: false, name: 'Men' };
  u19MenNavLink = { active: false, name: 'Women' };
  u15NavLink = { active: false, name: 'U15' };
  u15WomenNavLink = { active: false, name: 'Men' };
  u15MenNavLink = { active: false, name: 'Women' };
  u13NavLink = { active: false, name: 'U13' };
  u13WomenNavLink = { active: false, name: 'Women' };
  u13MenNavLink = { active: false, name: 'Men' };
  u10NavLink = { active: false, name: 'U10' };
  u10WomenNavLink = { active: false, name: 'Women' };
  u10MenNavLink = { active: false, name: 'Men' };
  playerStatusNavLink = { active: false, name: 'Status' };
  addPlayerNavLink = { active: false, name: 'Add' };
  activeNavLink = { active: false, name: 'Active' };
  beginnerNavLink = { active: false, name: 'Beginner' };
  interestedNavLink = { active: false, name: 'Interested' };
  inactiveNavLink = { active: false, name: 'Inactive' };

  constructor() {
  }

  deactivateAll() {
    this.playerNavLink.active = false;
    this.u19NavLink.active = false;
    this.u19WomenNavLink.active = false;
    this.u19MenNavLink.active = false;
    this.u15NavLink.active = false;
    this.u15WomenNavLink.active = false;
    this.u15MenNavLink.active = false;
    this.u13NavLink.active = false;
    this.u13WomenNavLink.active = false;
    this.u13MenNavLink.active = false;
    this.u10NavLink.active = false;
    this.u10WomenNavLink.active = false;
    this.u10MenNavLink.active = false;
    this.playerStatusNavLink.active = false;
    this.addPlayerNavLink.active = false;
    this.activeNavLink.active = false;
    this.beginnerNavLink.active = false;
    this.interestedNavLink.active = false;
    this.inactiveNavLink.active = false;
  }

  clickPlayerNavLink() {
    this.deactivateAll();
    this.playerNavLink.active = true;
  }

  clickU19NavLink() {
    this.deactivateAll();
    this.u19NavLink.active = true;
  }

  clickU19MenNavLink() {
    this.deactivateAll();
    this.u19MenNavLink.active = true;
  }

  clickU19WomenNavLink() {
    this.deactivateAll();
    this.u19WomenNavLink.active = true;
  }

  clickU15NavLink() {
    this.deactivateAll();
    this.u15NavLink.active = true;
  }

  clickU15MenNavLink() {
    this.deactivateAll();
    this.u15MenNavLink.active = true;
  }

  clickU15WomenNavLink() {
    this.deactivateAll();
    this.u15WomenNavLink.active = true;
  }

  clickU13NavLink() {
    this.deactivateAll();
    this.u13NavLink.active = true;
  }

  clickU13MenNavLink() {
    this.deactivateAll();
    this.u13MenNavLink.active = true;
  }

  clickU13WomenNavLink() {
    this.deactivateAll();
    this.u13WomenNavLink.active = true;
  }

  clickU10NavLink() {
    this.deactivateAll();
    this.u10NavLink.active = true;
  }

  clickU10MenNavLink() {
    this.deactivateAll();
    this.u10MenNavLink.active = true;
  }

  clickU10WomenNavLink() {
    this.deactivateAll();
    this.u10WomenNavLink.active = true;
  }

  clickPlayerStatusNavLink() {
    this.deactivateAll();
    this.playerStatusNavLink.active = true;
  }

  clickActiveNavLink() {
    this.deactivateAll();
    this.activeNavLink.active = true;
  }

  clickBeginnerNavLink() {
    this.deactivateAll();
    this.beginnerNavLink.active = true;
  }

  clickInterestedNavLink() {
    this.deactivateAll();
    this.interestedNavLink.active = true;
  }

  clickInactiveNavLink() {
    this.deactivateAll();
    this.inactiveNavLink.active = true;
  }

  clickAddPlayerNavLink() {
    this.deactivateAll();
    this.addPlayerNavLink.active = true;
  }

  ngOnInit() {
  }
}

export class NavLink {
  active: false;
  name: string;
}


