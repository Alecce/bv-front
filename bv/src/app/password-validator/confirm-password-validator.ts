import {AbstractControl, ValidationErrors} from '@angular/forms';

export class ConfirmPasswordValidator {
  static match(control: AbstractControl): Promise<ValidationErrors|null> {
    // const id = control.value as number;
    const password = control.get('password');
    const passwordConfirmation = control.get('password_confirmation');
    return new Promise(resolve => {
      // console.log(control);
      // console.log(password);

      console.log(passwordConfirmation);
      if (password.value !== passwordConfirmation.value) {

        resolve({matchPassword: true});
        // control.get('password_confirmation').setErrors({matchPassword: true});
      } else {
        resolve(null);
      }
    });
  }
}
