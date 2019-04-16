import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import * as maskActions from '../../store/actions/mask.actions';
import * as snorkelActions from '../../store/actions/snorkel.actions';
import * as gloveActions from '../../store/actions/glove.actions';
import * as stickActions from '../../store/actions/stick.actions';
import * as finsActions from '../../store/actions/fins.actions';
import * as maskSelectors from '../../store/selectors/mask.selectors';
import * as snorkelSelectors from '../../store/selectors/snorkel.selectors';
import * as gloveSelectors from '../../store/selectors/glove.selectors';
import * as stickSelectors from '../../store/selectors/stick.selectors';
import * as finsSelectors from '../../store/selectors/fins.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  inventoryClicked = false;
  typesClicked = false;
  statusesClicked = false;

  allMasks = [];
  allSnorkels = [];
  allGloves = [];
  allSticks = [];
  allFins = [];

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

  statusesToggle() {
    this.statusesClicked = !this.statusesClicked;
  }

  navigateTypes() {
    this.router.navigateByUrl('types');
  }

  navigateStatuses() {
    this.router.navigateByUrl('statuses');
  }

  sliceAppState() {
    this.store.dispatch(new maskActions.RequestGetAllMasks());
    this.store.dispatch(new snorkelActions.RequestGetAllSnorkels());
    this.store.dispatch(new gloveActions.RequestGetAllGloves());
    this.store.dispatch(new stickActions.RequestGetAllSticks());
    this.store.dispatch(new finsActions.RequestGetAllFins());

    this.store.select(maskSelectors.allMasks).subscribe(allMasks => this.allMasks = allMasks);
    this.store.select(snorkelSelectors.allSnorkels).subscribe(allSnorkels => this.allSnorkels = allSnorkels);
    this.store.select(gloveSelectors.allGloves).subscribe(allGloves => this.allGloves = allGloves);
    this.store.select(stickSelectors.allSticks).subscribe(allSticks => this.allSticks = allSticks);
    this.store.select(finsSelectors.allFins).subscribe(allFins => this.allFins = allFins);
  }

  ngOnInit() {
  }

}
