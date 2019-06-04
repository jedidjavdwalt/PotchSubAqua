import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  static tel() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return {
          isNotPhone: true
        };
      }

      if (control.value.toString().length !== 10) {
        return {
          isNotPhone: true
        };
      }
    };
  }
}
