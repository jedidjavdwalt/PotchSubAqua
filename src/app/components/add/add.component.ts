import { Component, OnInit } from '@angular/core';
import * as componentSelectors from '../../store/selectors/component.selectors';
import * as componentActions from '../../store/actions/component.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { InventoryItem } from 'src/app/models/InventoryItem';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addPlayers = false;
  addInventory = false;
  addRentals = false;
  newInventory = {} as InventoryItem;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
  ) { }

  navigateDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  addInventoryClicked() {
    if (
      !this.newInventory.type ||
      !this.newInventory.number ||
      !this.newInventory.brand ||
      !this.newInventory.color ||
      !this.newInventory.description ||
      !this.newInventory.status
    ) {
      console.log('error');

    } else {
      this.addNewInventory();

    }
  }

  addNewInventory() {
    this.angularFirestore.collection('inventory').add(this.newInventory);
    this.newInventory = {} as InventoryItem;
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
