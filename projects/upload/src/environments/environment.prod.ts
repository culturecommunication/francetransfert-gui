export const environment = {
  production: true,
  host: 'http://recette.francetransfert.culture.gouv.fr/' /** Make the server host here */,
  apis: {
    upload: 'api-private/upload-module/upload' /** Upload api */,
    tree: 'api-private/upload-module/sender-info' /** Tree api*/,
    confirmationCode: 'api-private/confirmation-module/validate-code' /** Confirmation code api*/
  }
};
