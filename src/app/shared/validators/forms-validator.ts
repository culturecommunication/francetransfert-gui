import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

// Custom Validators
export function passwordValidator(formControl: FormControl) {
  const password = formControl.value;
  if (password) {
    if (password.match(/[a-z]/g)?.reduce((p, c) => p + c)?.length >= 3 && password.match(/[A-Z]/g)?.reduce((p, c) => p + c)?.length >= 3
      && password.match(/\d+/g)?.reduce((p, c) => p + c)?.length >= 3 && password.match(/\W/g)?.reduce((p, c) => p + c)?.length >= 3) {
      return null;
    }
    return { pattern: true }
  } else {
    return null;
  }
}