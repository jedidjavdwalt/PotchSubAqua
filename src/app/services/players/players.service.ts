import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from 'src/app/models/Player';
import * as moment from 'moment';
import { Timestamp } from '@firebase/firestore-types';

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
    player.ageGroup = this.calculatePlayerAgeGroup(player.birthDate);

    this.addPlayer(player);
  }

  calculateDocumentId(playerFullName: string) {
    let newId = playerFullName;

    while (newId.indexOf(' ') !== -1) {
      newId = newId.replace(' ', '_');
    }

    return newId;
  }

  calculatePlayerAgeGroup(birthDate: Timestamp) {
    const currentYear = moment().year();
    const firstDayOfYear = moment(`${currentYear}-01-01`);
    const convertedBirthDate = moment(birthDate);
    const age = firstDayOfYear.diff(convertedBirthDate, 'years');
    let ageGroup = null;

    age <= 18 && age > 15
      ? ageGroup = 'U19'
      : age <= 15 && age > 13
        ? ageGroup = 'U15'
        : age <= 13 && age > 10
          ? ageGroup = 'U13'
          : age <= 10
            ? ageGroup = 'U10'
            : ageGroup = 'Senior';

    return ageGroup;
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
