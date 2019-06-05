import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from 'src/app/models/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private angularFirestore: AngularFirestore,
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
}
