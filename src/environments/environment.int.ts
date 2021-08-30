export const environment = {
  production: true,
  host: '/',
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
      rate: 'api-private/download-module/satisfaction'
    }
  },
  version: '1.0.3'
};
