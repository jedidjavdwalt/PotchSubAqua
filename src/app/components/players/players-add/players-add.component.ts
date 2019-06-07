import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { PlayersService } from 'src/app/services/players/players.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { Timestamp } from '@firebase/firestore-types';
import { CustomValidators } from 'src/app/models/CustomValidators';

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
    parentFullName: [null, [Validators.required, CustomValidators.fullName()]],
    parentCell: [null, [Validators.required, CustomValidators.tel()]],
  });

  juniorPlayerForm = this.formBuilder.group({
    juniorPlayerFullName: [null, [Validators.required, CustomValidators.fullName()]],
    juniorPlayerCell: [null, CustomValidators.tel()],
    juniorPlayerGender: [null, Validators.required],
  });

  seniorPlayerForm = this.formBuilder.group({
    seniorPlayerFullName: [null, [Validators.required, CustomValidators.fullName()]],
    seniorPlayerCell: [null, [Validators.required, CustomValidators.tel()]],
    seniorPlayerGender: [null, Validators.required],
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

  get juniorPlayerFullName() {
    return this.juniorPlayerForm.get('juniorPlayerFullName');
  }

  get juniorPlayerCell() {
    return this.juniorPlayerForm.get('juniorPlayerCell');
  }

  get juniorPlayerGender() {
    return this.juniorPlayerForm.get('juniorPlayerGender');
  }

  get seniorPlayerFullName() {
    return this.seniorPlayerForm.get('seniorPlayerFullName');
  }

  get seniorPlayerCell() {
    return this.seniorPlayerForm.get('seniorPlayerCell');
  }

  get seniorPlayerGender() {
    return this.seniorPlayerForm.get('seniorPlayerGender');
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
    let newPlayer = {} as Player;

    if (this.parentRequired()) {
      newPlayer = {
        birthDate: this.calculateBirthDate(),
        parentFullName: this.parentFullName.value,
        parentCell: this.parentCell.value,
        playerFullName: this.juniorPlayerFullName.value,
        playerCell: this.juniorPlayerCell.value,
        gender: this.juniorPlayerGender.value,
        ageGroup: this.calculatePlayerAgeGroup(this.calculateBirthDate()),
      } as Player;
    }

    if (!this.parentRequired()) {
      newPlayer = {
        birthDate: this.calculateBirthDate(),
        parentFullName: this.parentFullName.value,
        parentCell: this.parentCell.value,
        playerFullName: this.seniorPlayerFullName.value,
        playerCell: this.seniorPlayerCell.value,
        gender: this.seniorPlayerGender.value,
        ageGroup: this.calculatePlayerAgeGroup(this.calculateBirthDate()),
      } as Player;
    }

    this.playersService.createPlayerToAdd(newPlayer);

    this.birthDateForm.reset();
    this.parentForm.reset();
    this.juniorPlayerForm.reset();
    this.seniorPlayerForm.reset();
  }

  ngOnInit() { }

}
