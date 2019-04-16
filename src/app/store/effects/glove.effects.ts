import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions/glove.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { InventoryItem, InventoryItemData } from 'src/app/models/InventoryItem';

@Injectable()
export class GloveEffects {

    constructor(
        private actions$: Actions,
        private angularFirestore: AngularFirestore,
    ) {

    }

    @Effect()
    GetAllGloves$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_ALL_GLOVES),
        switchMap((action: actions.RequestGetAllGloves) => {
            return this.angularFirestore.collection
                ('inventory', ref => ref.where('type', '==', 'Glove').orderBy('number')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetGloveSuccess(new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.GetGloveError();
        })
    );
}
