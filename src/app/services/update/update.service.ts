import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player, PlayerData } from 'src/app/models/Player';
import { Timestamp } from '@firebase/firestore-types';
import * as moment from 'moment';
import { Rental, RentalData } from 'src/app/models/Rental';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private angularFirestore: AngularFirestore,
  ) { }

  calculateAgeGroup(birthDate: Timestamp): string {
    const currentYear = moment().year();
    const firstDayOfYear = moment(`${currentYear}-01-01`);
    const convertedBirthDate = moment.unix(birthDate.seconds);
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

  updatePlayersAgeGroups() {
    this.angularFirestore.collection('/players/').get().subscribe(snapShot => {
      snapShot.docs.forEach(doc => {
        const tempPlayer = new Player(doc.data() as PlayerData);
        const newAgeGroup = this.calculateAgeGroup(tempPlayer.birthDate);

        if (tempPlayer.ageGroup !== newAgeGroup) {
          tempPlayer.ageGroup = newAgeGroup;
          this.angularFirestore.doc(tempPlayer.docId).update(tempPlayer.toData()).then(() => {
            alert(tempPlayer.playerFullName + 'ageGroup updated');
          })
            .catch(error => {
              alert(error);
            });
        }
      });
    });
  }

  updateRentalsActionRequired() {
    this.angularFirestore.collection('/rentals/', ref => ref.where('endDate', '==', null)).get().subscribe(snapShot => {
      snapShot.docs.forEach(doc => {
        const tempRental = new Rental(doc.data() as RentalData);
        const currentDate = moment();

        if (currentDate.isAfter(moment(tempRental.dueDate))) {
          tempRental.actionRequired = 'Player';
          this.angularFirestore.doc(tempRental.docId).update(tempRental.toData()).then(() => {
            alert(tempRental.displayId + 'actionRequired updated');
          })
            .catch(error => {
              alert(error);
            });
        }
      });
    });
  }
}
