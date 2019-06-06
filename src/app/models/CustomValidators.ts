import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  static tel() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && (control.value.toString().length < 9 || control.value.toString().length > 9)) {
        return {
          isNotPhone: true
        };
      }
    };
  }

  static fullName() {
    return (control: AbstractControl): ValidationErrors | null => {
      let stringValue: string;

      if (control.value) {
        stringValue = control.value.toString();
      }

      if (stringValue && !stringValue.includes(' ')) {
        return {
          isNotFullName: true
        };
      }
    };
  }

}
