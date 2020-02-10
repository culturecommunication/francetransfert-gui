export const environment = {
  production: true,
  host: 'http://recette.francetransfert.culture.gouv.fr/' /** Make the server host here */,
  apis: {
    download: 'api-private/download-module/download-info' /** download api */,
    downloadUrl: 'api-private/download-module/generate-download-url' /** downloadUrl api*/,
    rate: 'api-private/download-module/satisfaction' /** Rate api*/
  }
};
