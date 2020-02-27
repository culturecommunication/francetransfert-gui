export const REGEX_EXP = {
  EMAIL:
    window['bootstrapUploadSettings'] &&
    window['bootstrapUploadSettings'].regex &&
    window['bootstrapUploadSettings'].regex.EMAIL
      ? window['bootstrapUploadSettings'].regex.EMAIL
      : '',
  GOUV_EMAIL:
    window['bootstrapUploadSettings'] &&
    window['bootstrapUploadSettings'].regex &&
    window['bootstrapUploadSettings'].regex.GOUV_EMAIL
      ? window['bootstrapUploadSettings'].regex.GOUV_EMAIL
      : ''
};
