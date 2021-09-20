// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'https://test-francetransfert.aot.agency/',
  apis: {
    upload: {
      upload: 'api-private/upload-module/upload',
      tree: 'api-private/upload-module/sender-info',
      confirmationCode: 'api-private/upload-module/validate-code',
      rate: 'api-private/upload-module/satisfaction'
    },
    download: {
      download: 'api-private/download-module/download-info',
      downloadUrl: 'api-private/download-module/generate-download-url',
      downloadInfosPublic: 'api-private/download-module/download-info-public',
      downloadUrlPublic: 'api-private/download-module/generate-download-url-public',
      validatePassword: 'api-private/download-module/validate-password',
      rate: 'api-private/download-module/satisfaction'
    },
    admin: {
      deleteFile: 'api-private/upload-module/delete-file',
      updateExpiredDate: 'api-private/upload-module/update-expired-date',
      fileInfos: 'api-private/upload-module/file-info'
    }
  },
  version: '1.0.4'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
