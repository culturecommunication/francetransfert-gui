// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'http://localhost:',
  apis: {
    config: '8080/api-private/upload-module/config',
    upload: {
      upload: '8080/api-private/upload-module/upload',
      tree: '8080/api-private/upload-module/sender-info',
      confirmationCode: '8080/api-private/upload-module/validate-code',
      generateCode: '8080/api-private/confirmation-module/generate-code',
      validateCode: '8080/api-private/confirmation-module/validate-code',
      rate: '8080/api-private/upload-module/satisfaction',
      validateMail: '8080/api-private/upload-module/validate-mail',
      config: '8080/api-private/upload-module/config',
      allowedSenderMail: '8080/api-private/upload-module/allowed-sender-mail',
      formulaireContact: '8080/api-private/upload-module/sender-contact'
    },
    download: {
      download: 'api-private/download-module/download-info',
      downloadUrl: 'api-private/download-module/generate-download-url',
      downloadInfosPublic: 'api-private/download-module/download-info-public',
      downloadUrlPublic: 'api-private/download-module/generate-download-url-public',
      validatePassword: 'api-private/download-module/validate-password',
      rate: 'api-private/download-module/satisfaction',
      downloadConnect: 'api-private/download-module/download-info-connect',
    },
    admin: {
      deleteFile: 'api-private/upload-module/delete-file',
      updateExpiredDate: 'api-private/upload-module/update-expired-date',
      fileInfos: 'api-private/upload-module/file-info',
      fileInfosConnect: 'api-private/upload-module/file-info-connect',
      addNewRecipient: 'api-private/upload-module/add-recipient',
      deleteRecipient: 'api-private/upload-module/delete-recipient',
      getPlisSent: 'api-private/upload-module/get-plis-sent',
      getPlisReceived: 'api-private/upload-module/get-plis-received',
      resendLink: 'api-private/upload-module/resend-download-link'
    },
    captcha: {
      url: '8080/https://test-francetransfert.aot.agency/captcha/captcha/'
    }
  },
  version: '3.5.0'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
