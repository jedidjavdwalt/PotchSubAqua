import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

import * as maskReducers from '../app/store/reducers/mask.reducers';
import * as snorkelReducers from '../app/store/reducers/snorkel.reducers';
import * as gloveReducers from '../app/store/reducers/glove.reducers';
import * as stickReducers from '../app/store/reducers/stick.reducers';
import * as finsReducers from '../app/store/reducers/fins.reducers';
import * as componentReducers from '../app/store/reducers/component.reducers';

import * as maskEffects from '../app/store/effects/mask.effects';
import * as snorkelEffects from '../app/store/effects/snorkel.effects';
import * as gloveEffects from '../app/store/effects/glove.effects';
import * as stickEffects from '../app/store/effects/stick.effects';
import * as finsEffects from '../app/store/effects/fins.effects';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddComponent } from './components/add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({
      maskState: maskReducers.maskReducer, snorkelState: snorkelReducers.snorkelReducer, gloveState: gloveReducers.gloveReducer,
      stickState: stickReducers.stickReducer, finsState: finsReducers.finsReducer, componentState: componentReducers.componentReducer,
    }),
    EffectsModule.forRoot([
      maskEffects.MaskEffects, snorkelEffects.SnorkelEffects, gloveEffects.GloveEffects,
      stickEffects.StickEffects, finsEffects.FinsEffects
    ]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    AngularFirestore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
