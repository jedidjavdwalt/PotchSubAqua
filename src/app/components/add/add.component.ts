import { Component, OnInit } from '@angular/core';
import * as componentSelectors from '../../store/selectors/component.selectors';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addPlayers = false;
  addInventory = false;
  addRentals = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  navigateDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  sliceAppState() {
    this.store.select(componentSelectors.addPlayers).subscribe(addPlayers => this.addPlayers = addPlayers);
    this.store.select(componentSelectors.addInventory).subscribe(addInventory => this.addInventory = addInventory);
    this.store.select(componentSelectors.addRentals).subscribe(addRentals => this.addRentals = addRentals);

    if (!this.addPlayers && !this.addInventory && !this.addRentals) {
      this.navigateDashboard();
    }
  }

  ngOnInit() {
    this.sliceAppState();
  }

}
