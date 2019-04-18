import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

import * as inventoryReducers from '../app/store/reducers/inventory.reducers';
import * as playersReducers from '../app/store/reducers/players.reducers';

import * as inventoryEffects from '../app/store/effects/inventory.effects';
import * as playersEffects from '../app/store/effects/players.effects';


import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({
      inventoryState: inventoryReducers.inventoryReducer,
      playersState: playersReducers.playersReducer,
    }),
    EffectsModule.forRoot([
      inventoryEffects.InventoryEffects,
      playersEffects.PlayersEffects,
    ]),
    StoreDevtoolsModule.instrument(),
    FormsModule,
  ],
  providers: [
    AngularFirestore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
