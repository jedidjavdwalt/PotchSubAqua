import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import * as usersReducers from '../app/store/reducers/users.reducers';
import * as playersReducers from '../app/store/reducers/players.reducers';
import * as inventoryReducers from '../app/store/reducers/inventory.reducers';
import * as rentalsReducers from '../app/store/reducers/rentals.reducers';

import * as usersEffects from '../app/store/effects/users.effects';
import * as playersEffects from '../app/store/effects/players.effects';
import * as inventoryEffects from '../app/store/effects/inventory.effects';
import * as rentalsEffects from '../app/store/effects/rentals.effects';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlayersAddComponent } from './components/players/players-add/players-add.component';
import { PlayersDetailComponent } from './components/players/players-detail/players-detail.component';
import { InventoryAddComponent } from './components/inventory/inventory-add/inventory-add.component';
import { InventoryDetailComponent } from './components/inventory/inventory-detail/inventory-detail.component';
import { RentalsAddComponent } from './components/rentals/rentals-add/rentals-add.component';
import { RentalsDetailComponent } from './components/rentals/rentals-detail/rentals-detail.component';
import { RentalsEditComponent } from './components/rentals/rentals-edit/rentals-edit.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlayersAddComponent,
    PlayersDetailComponent,
    InventoryAddComponent,
    InventoryDetailComponent,
    RentalsAddComponent,
    RentalsDetailComponent,
    RentalsEditComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({
      usersState: usersReducers.usersReducer,
      playersState: playersReducers.playersReducer,
      inventoryState: inventoryReducers.inventoryReducer,
      rentalsState: rentalsReducers.rentalsReducer,
    }),
    EffectsModule.forRoot([
      usersEffects.UsersEffects,
      playersEffects.PlayersEffects,
      inventoryEffects.InventoryEffects,
      rentalsEffects.RentalsEffects,
    ]),
    StoreDevtoolsModule.instrument(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
