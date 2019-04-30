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

  player: Player = {} as Player;

  constructor(
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
  ) { }

  createPlayerToAdd(birthDate: string, player: Player): string {
    this.player = player;

    this.player.birthDate = this.convertDateStringToTimestamp(birthDate);
    this.player.ageGroup = this.calculatePlayerAgeGroup(birthDate);
    this.player.id = this.calculatePlayerDocumentId(this.player.player);

    if (!this.player.player ||
      !this.player.gender ||
      isNaN(this.player.birthDate.seconds) ||
      !this.player.ageGroup) {
      return 'You forgot to fill in some fields';
    }

    if (!this.player.parent && this.player.ageGroup !== 'Senior') {
      return 'You forgot to add a parent';
    }

    if (!this.player.playerCell &&
      !this.player.parentCell) {
      return 'You forgot to fill in a cell number';
    }

    return this.addPlayer();
  }

  addPlayer(): string {
    let alert = null;

    this.angularFirestore.collection('/players/').doc(this.player.id).get().subscribe(snapShot => {
      if (!snapShot.exists) {
        this.angularFirestore.collection('/players/').doc(this.player.id).set(this.player);
        alert = this.player.player + 'added';
      } else {
        alert(this.player.player + ' already exists');
      }
    });

    this.player = {} as Player;
    return alert;
  }

  convertDateStringToTimestamp(stringToConvert: string) {
    return firebase.firestore.Timestamp.fromDate(new Date(stringToConvert));
  }

  calculatePlayerAgeGroup(selectedBirthDate: string) {
    const currentYear = moment().year();
    const firstDayOfYear = moment(`${currentYear}-01-01`);
    const convertedBirthDate = moment(selectedBirthDate);
    const age = firstDayOfYear.diff(convertedBirthDate, 'years');
    let ageGroup;

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

  calculatePlayerDocumentId(selectedStrings: string) {
    let newId = selectedStrings;

    while (newId.indexOf(' ') !== -1) {
      newId = newId.replace(' ', '_');
    }

    return newId;
  }
}
