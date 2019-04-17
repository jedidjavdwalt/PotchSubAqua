import { Component, OnInit } from '@angular/core';
import * as maskSelectors from '../../store/selectors/mask.selectors';
import * as snorkelSelectors from '../../store/selectors/snorkel.selectors';
import * as gloveSelectors from '../../store/selectors/glove.selectors';
import * as stickSelectors from '../../store/selectors/stick.selectors';
import * as finsSelectors from '../../store/selectors/fins.selectors';
import * as componentSelectors from '../../store/selectors/component.selectors';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  selectedType = null;
  selectedTypeItems = [];

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  navigateDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  sliceAppState() {
    this.store.select(componentSelectors.selectedType).subscribe(selectedType => this.selectedType = selectedType);

    if (!this.selectedType) {
      this.navigateDashboard();
    }

    if (this.selectedType === 'Mask') {
      this.store.select(maskSelectors.allMasks).subscribe(allMasks => this.selectedTypeItems = allMasks);
    } else if (this.selectedType === 'Snorkel') {
      this.store.select(snorkelSelectors.allSnorkels).subscribe(allSnorkels => this.selectedTypeItems = allSnorkels);
    } else if (this.selectedType === 'Glove') {
      this.store.select(gloveSelectors.allGloves).subscribe(allGloves => this.selectedTypeItems = allGloves);
    } else if (this.selectedType === 'Stick') {
      this.store.select(stickSelectors.allSticks).subscribe(allSticks => this.selectedTypeItems = allSticks);
    } else {
      this.store.select(finsSelectors.allFins).subscribe(allFins => this.selectedTypeItems = allFins);
    }
  }

  ngOnInit() {
    this.sliceAppState();
  }

}
