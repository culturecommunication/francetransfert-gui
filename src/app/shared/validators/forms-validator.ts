import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

const specialCharList = "!@#$%^&*()_-:+";
const specialCharRegexEscape = specialCharList.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
const regex = new RegExp(`[${specialCharRegexEscape}]`, "g");
const notValidChar = new RegExp(`[^${specialCharRegexEscape}a-zA-Z1-9]+`, "g");


var not_SupportedChar = new RegExp("[^a-zA-Z0-9 !@#$%^&*()_:+-]+$");


// Custom Validators
export function passwordValidator(formControl: FormControl) {
  const password = formControl.value;
  if (password) {
    if (password.match(/[a-z]/g)?.reduce((p, c) => p + c)?.length >= 3 && password.match(/[A-Z]/g)?.reduce((p, c) => p + c)?.length >= 3
      && password.match(/\d+/g)?.reduce((p, c) => p + c)?.length >= 3 && password.match(regex)?.reduce((p, c) => p + c)?.length >= 3) {
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
  return value?.match(regex)?.reduce((p, c) => p + c)?.length >= 3;
}

export function noSpecial(value: string) {
  return value?.match(notValidChar);
}
