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
      downloadInfosPublic: 'api-private/download-module/download-info-public',
      downloadUrlPublic: 'api-private/download-module/generate-download-url-public',
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
