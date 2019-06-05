import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

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
