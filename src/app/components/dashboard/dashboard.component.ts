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
  inventoryClicked = false;
  typesClicked = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  inventoryToggle() {
    this.inventoryClicked = !this.inventoryClicked;
  }

  typesToggle() {
    this.typesClicked = !this.typesClicked;
  }

  navigateInventory(selectedType: string) {
    this.store.dispatch(new componentActions.SelectType(selectedType));
    this.router.navigateByUrl('inventory');
  }

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
