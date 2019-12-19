// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'http://recette.francetransfert.culture.gouv.fr/' /** Make the server host here */,
  apis: {
    upload: 'api-private/upload-module/upload' /** Upload api */,
    tree: 'api-private/upload-module/sender-info' /** Tree api*/,
    confirmationCode: 'api-private/upload-module/validate-code' /** Confirmation code api*/,
    rate: 'api-private/upload-module/satisfaction' /** Rate api*/
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
