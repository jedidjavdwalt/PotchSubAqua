import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from 'src/app/models/Player';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { Timestamp } from '@firebase/firestore-types';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

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

    // playerFullName, playerCell, gender, parentFullName, parentCell
    player = playerToAdd;

    // if (!player.playerFullName ||
    //   !player.gender) {

    //   return 'You forgot to fill in some fields';
    // }

    // if (!player.playerCell &&
    //   !player.parentCell) {
    //   return 'You forgot to fill in a cell number';
    // }

    // docId
    player.docId = this.calculateDocumentId(player.playerFullName);

    // birthDate
    // player.birthDate = this.convertDateStringToTimestamp(birthDate);

    // if (isNaN(player.birthDate.seconds)) {
    //   return 'You forgot to fill in some fields';
    // }

    // ageGroup
    player.ageGroup = this.calculatePlayerAgeGroup(player.birthDate);

    // if (!player.parentFullName && player.ageGroup !== 'Senior') {
    //   return 'You forgot to add a parent';
    // }

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
    // add player
    this.angularFirestore.collection('/players/').doc(player.docId).get().subscribe(snapShot => {
      if (!snapShot.exists) {
        this.angularFirestore.collection('/players/').doc(player.docId).set(player).then(() => {
          alert(player.playerFullName + ' added');
          // this.store.dispatch(new alertsActions.AddAlert(player.playerFullName + ' added'));
        }).catch(error => {
          alert(error);
          // this.store.dispatch(new alertsActions.AddAlert(error));
        });
      } else {
        alert(player.playerFullName + ' already exists');
        // this.store.dispatch(new alertsActions.AddAlert(player.playerFullName + ' already exists'));
      }
    });
  }
}
