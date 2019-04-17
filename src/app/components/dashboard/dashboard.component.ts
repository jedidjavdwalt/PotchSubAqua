import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import * as maskActions from '../../store/actions/mask.actions';
import * as snorkelActions from '../../store/actions/snorkel.actions';
import * as gloveActions from '../../store/actions/glove.actions';
import * as stickActions from '../../store/actions/stick.actions';
import * as finsActions from '../../store/actions/fins.actions';
import * as componentActions from '../../store/actions/component.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  playersClicked = false;
  inventoryClicked = false;
  rentalsClicked = false;

  u19Clicked = false;
  u15Clicked = false;
  u13Clicked = false;
  // u10Clicked = navigate;
  // beginnersClicked = navigate;
  // playersAddClicked = navigate;

  ladiesClicked = false;
  menClicked = false;

  inventoryTypeClicked = false;
  inventoryStatusClicked = false;
  // inventoryAddClicked = navigate;


  rentalsTypeClicked = false;
  rentalsStatusClicked = false;
  // rentalsAddClicked = navigate;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  togglePlayersClicked() {
    if (this.playersClicked) {
      this.playersClicked = false;
    } else {
      this.playersClicked = true;
      this.inventoryClicked = false;
      this.rentalsClicked = false;
    }
  }

  toggleU19Clicked() {
    if (this.u19Clicked) {
      this.u19Clicked = false;
    } else {
      this.u19Clicked = true;
      this.u15Clicked = false;
      this.u13Clicked = false;
    }
  }

  toggleU15Clicked() {
    if (this.u15Clicked) {
      this.u15Clicked = false;
    } else {
      this.u15Clicked = true;
      this.u19Clicked = false;
      this.u13Clicked = false;
    }
  }

  toggleU13Clicked() {
    if (this.u13Clicked) {
      this.u13Clicked = false;
    } else {
      this.u13Clicked = true;
      this.u19Clicked = false;
      this.u15Clicked = false;
    }
  }

  navigateList() {
    console.log('navigateList');

  }

  navigateAdd() {
    console.log('navigateAdd');

  }

  toggleInventoryClicked() {
    if (this.inventoryClicked) {
      this.inventoryClicked = false;
    } else {
      this.inventoryClicked = true;
      this.playersClicked = false;
      this.rentalsClicked = false;
    }
  }

  toggleInventoryStatusClicked() {
    if (this.inventoryStatusClicked) {
      this.inventoryStatusClicked = false;
    } else {
      this.inventoryStatusClicked = true;
      this.inventoryTypeClicked = false;
    }
  }

  toggleInventoryTypeClicked() {
    if (this.inventoryTypeClicked) {
      this.inventoryTypeClicked = false;
    } else {
      this.inventoryTypeClicked = true;
      this.inventoryStatusClicked = false;
    }
  }

  toggleRentalsClicked() {
    if (this.rentalsClicked) {
      this.rentalsClicked = false;
    } else {
      this.rentalsClicked = true;
      this.playersClicked = false;
      this.inventoryClicked = false;
    }
  }

  toggleRentalStatusClicked() {
    if (this.rentalsStatusClicked) {
      this.rentalsStatusClicked = false;
    } else {
      this.rentalsStatusClicked = true;
      this.rentalsTypeClicked = false;
    }
  }

  toggleRentalTypeClicked() {
    if (this.rentalsTypeClicked) {
      this.rentalsTypeClicked = false;
    } else {
      this.rentalsTypeClicked = true;
      this.rentalsStatusClicked = false;
    }
  }

  // navigateInventory(selectedType: string) {
  //   this.store.dispatch(new componentActions.SelectType(selectedType));
  //   this.router.navigateByUrl('inventory');
  // }

  sliceAppState() {
    this.store.dispatch(new maskActions.RequestGetAllMasks());
    this.store.dispatch(new snorkelActions.RequestGetAllSnorkels());
    this.store.dispatch(new gloveActions.RequestGetAllGloves());
    this.store.dispatch(new stickActions.RequestGetAllSticks());
    this.store.dispatch(new finsActions.RequestGetAllFins());
  }

  ngOnInit() {
    this.sliceAppState();
  }

}
