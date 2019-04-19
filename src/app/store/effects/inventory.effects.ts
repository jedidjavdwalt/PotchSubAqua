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
    ) { }

    @Effect()
    GetInventoryItemByStatus$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_INVENTORY_ITEMS_BY_STATUS),
        switchMap((action: actions.RequestGetInventoryItemsByStatus) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('status', '==', action.payload)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetInventoryItemSuccess(
                    new InventoryItem(action.payload.doc.id, action.payload.doc.data() as InventoryItemData));
            }
            return new actions.ClearInventoryState();
        })
    );

    @Effect()
    GetInventoryItemByType$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_INVENTORY_ITEMS_BY_TYPE),
        switchMap((action: actions.RequestGetInventoryItemsByType) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', action.payload)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetInventoryItemSuccess(
                    new InventoryItem(action.payload.doc.id, action.payload.doc.data() as InventoryItemData));
            }
            return new actions.ClearInventoryState();
        })
    );
}
