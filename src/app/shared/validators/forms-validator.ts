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

export function sizeControl(value: string) {
  return value?.length >= 12 && value.length <= 20;
}

export function minChar(value: string) {
  return value?.match(/[a-z]/g)?.reduce((p, c) => p + c)?.length >= 3;
}

export function majChar(value: string) {
  return value?.match(/[A-Z]/g)?.reduce((p, c) => p + c)?.length >= 3;
}

export function numChar(value: string) {
  return value?.match(/\d/g)?.reduce((p, c) => p + c)?.length >= 3;
}

export function specialChar(value: string) {
  return value?.match(/\W/g)?.reduce((p, c) => p + c)?.length >= 3;
}