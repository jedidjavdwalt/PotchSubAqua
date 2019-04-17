import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions/stick.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { InventoryItem, InventoryItemData } from 'src/app/models/InventoryItem';

@Injectable()
export class StickEffects {

    constructor(
        private actions$: Actions,
        private angularFirestore: AngularFirestore,
    ) {

    }

    @Effect()
    GetAllGloves$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_ALL_STICKS),
        switchMap((action: actions.RequestGetAllSticks) => {
            return this.angularFirestore.collection
                ('/inventory/', ref => ref.where('type', '==', 'Stick')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetStickSuccess(new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.GetStickError();
        })
    );
}
