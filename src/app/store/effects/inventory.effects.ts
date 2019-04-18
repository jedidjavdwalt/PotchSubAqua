import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions/inventory.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { InventoryItem, InventoryItemData } from 'src/app/models/InventoryItem';

@Injectable()
export class InventoryEffects {

    constructor(
        private actions$: Actions,
        private angularFirestore: AngularFirestore,
    ) {

    }

    @Effect()
    GetAllMasks$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_ALL_MASKS),
        switchMap((action: actions.RequestGetAllMasks) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', 'Mask')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetInventoryItemSuccess(new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.ClearInventoryState();
        })
    );

    @Effect()
    GetAllSnorkels$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_ALL_SNORKELS),
        switchMap((action: actions.RequestGetAllSnorkels) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', 'Snorkel')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetInventoryItemSuccess(new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.ClearInventoryState();
        })
    );

    @Effect()
    GetAllGloves$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_ALL_GLOVES),
        switchMap((action: actions.RequestGetAllGloves) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', 'Glove')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetInventoryItemSuccess(new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.ClearInventoryState();
        })
    );

    @Effect()
    GetAllSticks$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_ALL_STICKS),
        switchMap((action: actions.RequestGetAllSticks) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', 'Stick')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetInventoryItemSuccess(new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.ClearInventoryState();
        })
    );

    @Effect()
    GetAllFins$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_ALL_FINS),
        switchMap((action: actions.RequestGetAllFins) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', 'Fins')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetInventoryItemSuccess(new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.ClearInventoryState();
        })
    );
}
