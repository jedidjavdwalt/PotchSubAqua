import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions/mask.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { InventoryItem, InventoryItemData } from 'src/app/models/InventoryItem';

@Injectable()
export class MaskEffects {

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
                return new actions.GetMaskSuccess(new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.GetMaskError();
        })
    );
}
