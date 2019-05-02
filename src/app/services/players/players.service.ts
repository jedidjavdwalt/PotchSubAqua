import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from 'src/app/models/Player';
import * as firebase from 'firebase';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
  ) { }

  createPlayerToAdd(birthDate: string, playerToAdd: Player): string {
    let player = {} as Player;

    // playerFullName, playerCell, gender, parentFullName, parentCell
    player = playerToAdd;

    if (!player.playerFullName ||
      !player.gender) {

      return 'You forgot to fill in some fields';
    }

    if (!player.playerCell &&
      !player.parentCell) {
      return 'You forgot to fill in a cell number';
    }

    // docId
    player.docId = this.calculateDocumentId(player.playerFullName);

    // birthDate
    player.birthDate = this.convertDateStringToTimestamp(birthDate);

    if (isNaN(player.birthDate.seconds)) {
      return 'You forgot to fill in some fields';
    }

    // ageGroup
    player.ageGroup = this.calculatePlayerAgeGroup(birthDate);

    if (!player.parentFullName && player.ageGroup !== 'Senior') {
      return 'You forgot to add a parent';
    }

    this.addPlayer(player);
    return player.playerFullName + ' added';
  }

  calculateDocumentId(playerFullName: string) {
    let newId = playerFullName;

    while (newId.indexOf(' ') !== -1) {
      newId = newId.replace(' ', '_');
    }

    return newId;
  }

  convertDateStringToTimestamp(dateString: string) {
    return firebase.firestore.Timestamp.fromDate(new Date(dateString));
  }

  calculatePlayerAgeGroup(birthDate: string) {
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
    // add player
    this.angularFirestore.collection('/players/').doc(player.docId).get().subscribe(snapShot => {
      if (!snapShot.exists) {
        this.angularFirestore.collection('/players/').doc(player.docId).set(player);
      }
    });
  }
}
