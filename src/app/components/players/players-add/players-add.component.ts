import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { PlayersService } from 'src/app/services/players/players.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { Timestamp } from '@firebase/firestore-types';
import { CustomValidatorsService } from 'src/app/services/custom-validators/custom-validators.service';

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
    parentCell: [null, CustomValidatorsService.tel],
  });

  playerForm = this.formBuilder.group({
    gender: [null, Validators.required],
    playerFullName: [null, Validators.required],
    playerCell: [null, CustomValidatorsService.tel],
  });

  constructor(
    private playersService: PlayersService,
    private formBuilder: FormBuilder,
  ) { }

  calculateMaxDate(): string {
    const currentYear = moment().year();
    const firstDayOfYear = moment(`${currentYear}-01-01`);
    return firstDayOfYear.subtract(7, 'years').format('YYYY-MM-DD');
  }

  parentRequired() {
    if (this.birthDate.valid && this.calculatePlayerAgeGroup(this.calculateBirthDate()) !== 'Senior') {
      return true;
    }

    return false;
  }

  get playerFullName() {
    return this.playerForm.get('playerFullName');
  }

  get playerCell() {
    return this.playerForm.get('playerCell');
  }

  get gender() {
    return this.playerForm.get('gender');
  }

  get birthDate() {
    return this.playerForm.get('birthDate');
  }

  get parentFullName() {
    return this.playerForm.get('parentFullName');
  }

  get parentCell() {
    return this.playerForm.get('parentCell');
  }

  calculateBirthDate(): Timestamp {
    return firebase.firestore.Timestamp.fromDate(moment(this.playerForm.controls.birthDate.value).toDate());
  }

  calculatePlayerAgeGroup(birthDate: Timestamp) {
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
      playerFullName: this.playerForm.controls.playerFullName.value,
      playerCell: this.playerForm.controls.playerCell.value,
      gender: this.playerForm.controls.gender.value,
      birthDate: this.calculateBirthDate(),
      parentFullName: this.playerForm.controls.parentFullName.value,
      parentCell: this.playerForm.controls.parentCell.value,
      ageGroup: this.calculatePlayerAgeGroup(this.calculateBirthDate()),
    } as Player;

    this.playersService.createPlayerToAdd(newPlayer);
    this.playerForm.reset();
  }

  ngOnInit() {

  }

}
