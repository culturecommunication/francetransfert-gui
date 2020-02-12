(function(window) {
  /** Download Configuration */
  const DownloadSettings = {
    host: 'http://recette.francetransfert.culture.gouv.fr/',
    apis: {
      download: 'api-private/download-module/download-info',
      downloadUrl: 'api-private/download-module/generate-download-url',
      rate: 'api-private/download-module/satisfaction'
    }
  };

  /** Export Configuration to window */
  window.bootstrapDownloadSettings = DownloadSettings;
})(this);
