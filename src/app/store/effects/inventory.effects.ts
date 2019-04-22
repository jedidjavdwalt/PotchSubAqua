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
    GetInventoryItemsByStatus$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_INVENTORY_ITEMS_BY_STATUS),
        switchMap((action: actions.RequestGetInventoryItemsByStatus) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('status', '==', action.payload)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetInventoryItemSuccess(
                    new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.UnimplementedAction();
        })
    );

    @Effect()
    GetInventoryItemsByType$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_INVENTORY_ITEMS_BY_TYPE),
        switchMap((action: actions.RequestGetInventoryItemsByType) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', action.payload)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetInventoryItemSuccess(
                    new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.UnimplementedAction();
        })
    );

    @Effect()
    GetAvailableMasks$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_AVAILABLE_MASKS),
        switchMap((action: actions.RequestGetAvailableMasks) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', 'Mask').where('status', '==', 'Available')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetAvailableMaskSuccess(
                    new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.UnimplementedAction();
        })
    );

    @Effect()
    GetAvailableSnorkels$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_AVAILABLE_SNORKELS),
        switchMap((action: actions.RequestGetAvailableSnorkels) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', 'Snorkel').where('status', '==', 'Available')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetAvailableSnorkelSuccess(
                    new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.UnimplementedAction();
        })
    );

    @Effect()
    GetAvailableGloves$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_AVAILABLE_GLOVES),
        switchMap((action: actions.RequestGetAvailableGloves) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', 'Glove').where('status', '==', 'Available')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetAvailableGloveSuccess(
                    new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.UnimplementedAction();
        })
    );

    @Effect()
    GetAvailableSticks$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_AVAILABLE_STICKS),
        switchMap((action: actions.RequestGetAvailableSticks) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', 'Stick').where('status', '==', 'Available')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetAvailableStickSuccess(
                    new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.UnimplementedAction();
        })
    );

    @Effect()
    GetAvailableFins$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_AVAILABLE_FINS),
        switchMap((action: actions.RequestGetAvailableFins) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', 'Fins').where('status', '==', 'Available')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetAvailableFinsSuccess(
                    new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.UnimplementedAction();
        })
    );
}
