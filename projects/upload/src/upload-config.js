(function(window) {
  /** Upload Configuration */
  const UploadSettings = {
    host: '/',
    apis: {
      upload: 'api-private/upload-module/upload',
      tree: 'api-private/upload-module/sender-info',
      confirmationCode: 'api-private/upload-module/validate-code',
      rate: 'api-private/upload-module/satisfaction'
    },
    regex: {
      EMAIL: /^\w+([\.-]\w+)*(\+\w+)?@\w+([\.-]\w+)*(\.\w+)+$/
    }
  };

  /** Export Configuration to window */
  window.bootstrapUploadSettings = UploadSettings;
})(this);
