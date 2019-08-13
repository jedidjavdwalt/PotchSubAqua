import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from 'src/app/models/Player';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as playerActions from '../../store/actions/players.actions';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private angularFirestore: AngularFirestore,
    private store: Store<AppState>,
  ) { }

  createPlayerToAdd(playerToAdd: Player) {
    let player = {} as Player;

    player = playerToAdd;
    player.docId = this.calculateDocumentId(player.playerFullName);

    this.addPlayer(player);
  }

  calculateDocumentId(playerFullName: string) {
    let newId = playerFullName;

    while (newId.indexOf(' ') !== -1) {
      newId = newId.replace(' ', '_');
    }

    return newId;
  }

  addPlayer(player: Player) {
    this.angularFirestore.collection('/players/').doc(player.docId).get().subscribe(snapShot => {
      if (!snapShot.exists) {
        this.angularFirestore.collection('/players/').doc(player.docId).set(player).then(() => {
          alert(player.playerFullName + ' added');
        }).catch(error => {
          alert(error);
        });
      } else {
        alert(player.playerFullName + ' already exists');
      }
    });
  }

  createPlayerToEdit(playerToEdit: Player) {
    let player = {} as Player;

    player = playerToEdit;

    this.editPlayer(player);
  }

  editPlayer(player: Player) {
    this.angularFirestore.collection('/players/').doc(player.docId).update(player.toData()).then(() => {
      alert(player.playerFullName + ' saved');
      this.store.dispatch(new playerActions.SetSelectedPlayer(player));
    }).catch(error => {
      alert(error);
    });
  }
}
