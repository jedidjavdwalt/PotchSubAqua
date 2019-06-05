import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { PlayersService } from 'src/app/services/players/players.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { Timestamp } from '@firebase/firestore-types';

@Component({
  selector: 'app-players-add',
  templateUrl: './players-add.component.html',
  styleUrls: ['./players-add.component.css']
})
export class PlayersAddComponent implements OnInit {

  birthDateForm = this.formBuilder.group({
    birthDate: [null, Validators.required],
  });

  parentForm = this.formBuilder.group({
    parentFullName: [null, Validators.required],
    parentCell: [null, Validators.required],
  });

  juniorPlayerForm = this.formBuilder.group({
    playerFullName: [null, Validators.required],
    playerCell: [null],
    gender: [null, Validators.required],
  });

  seniorPlayerForm = this.formBuilder.group({
    playerFullName: [null, Validators.required],
    playerCell: [null, Validators.required],
    gender: [null, Validators.required],
  });

  constructor(
    private playersService: PlayersService,
    private formBuilder: FormBuilder,
  ) { }

  get birthDate() {
    return this.birthDateForm.get('birthDate');
  }

  get parentFullName() {
    return this.parentForm.get('parentFullName');
  }

  get parentCell() {
    return this.parentForm.get('parentCell');
  }

  get playerFullName() {
    return this.juniorPlayerForm.get('playerFullName');
  }

  get playerCell() {
    return this.juniorPlayerForm.get('playerCell');
  }

  get gender() {
    return this.juniorPlayerForm.get('gender');
  }

  parentRequired(): boolean {
    if (this.birthDate.valid && this.calculatePlayerAgeGroup(this.calculateBirthDate()) !== 'Senior') {
      return true;
    }

    return false;
  }

  calculateMaxDate(): string {
    const currentYear = moment().year();
    const firstDayOfYear = moment(`${currentYear}-01-01`);
    return firstDayOfYear.subtract(7, 'years').format('YYYY-MM-DD');
  }

  calculateBirthDate(): Timestamp {
    return firebase.firestore.Timestamp.fromDate(moment(this.birthDate.value).toDate());
  }

  calculatePlayerAgeGroup(birthDate: Timestamp): string {
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

  onAddClick() {
    const newPlayer = {
      birthDate: this.calculateBirthDate(),
      parentFullName: this.juniorPlayerForm.controls.parentFullName.value,
      parentCell: this.juniorPlayerForm.controls.parentCell.value,
      playerFullName: this.juniorPlayerForm.controls.playerFullName.value,
      playerCell: this.juniorPlayerForm.controls.playerCell.value,
      gender: this.juniorPlayerForm.controls.gender.value,
      ageGroup: this.calculatePlayerAgeGroup(this.calculateBirthDate()),
    } as Player;

    this.playersService.createPlayerToAdd(newPlayer);
    this.juniorPlayerForm.reset();
  }

  ngOnInit() {

  }

}
