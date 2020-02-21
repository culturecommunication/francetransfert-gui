(function(window) {
  /** Upload Configuration */
  const UploadSettings = {
    host: 'https://recette.francetransfert.culture.gouv.fr/',
    apis: {
      upload: 'api-private/upload-module/upload',
      tree: 'api-private/upload-module/sender-info',
      confirmationCode: 'api-private/upload-module/validate-code',
      rate: 'api-private/upload-module/satisfaction'
    },
    regex: {
      EMAIL: /^\w+([\.-]\w+)*(\+\w+)?@\w+([\.-]\w+)*(\.\w+)+$/,
      GOUV_EMAIL: /^\w+([\.-]\w+)*(\+\w+)?@(\w+([\.-]\w+)*\.)?gouv\.fr$/
    }
  };

  /** Export Configuration to window */
  window.bootstrapUploadSettings = UploadSettings;
})(this);
