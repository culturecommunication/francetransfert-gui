export const environment = {
  production: true,
  host: 'https://recette.francetransfert.culture.gouv.fr/',
  apis: {
    upload: 'api-private/upload-module/upload',
    tree: 'api-private/upload-module/sender-info',
    confirmationCode: 'api-private/upload-module/validate-code',
    rate: 'api-private/upload-module/satisfaction'
  },
  version: '1.0.3'
};
