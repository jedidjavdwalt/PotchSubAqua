import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions/fins.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { InventoryItem, InventoryItemData } from 'src/app/models/InventoryItem';

@Injectable()
export class FinsEffects {

    constructor(
        private actions$: Actions,
        private angularFirestore: AngularFirestore,
    ) {

    }

    @Effect()
    GetAllGloves$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_ALL_FINS),
        switchMap((action: actions.RequestGetAllFins) => {
            return this.angularFirestore.collection
                ('inventory', ref => ref.where('type', '==', 'Fins').orderBy('number')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetFinsSuccess(new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.GetFinsError();
        })
    );
}
