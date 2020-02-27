export const PAGES = {
  BASIC_404: {
    title: 'Erreur HTTP 404',
    code: '404'
  },
  BASIC_500: {
    title: 'Erreur HTTP 500',
    code: '500'
  },
  TECHNICAL_ERROR: {
    title: 'Erreur technique',
    key: 'TECHNICAL_ERROR'
  },
  DOWNLOAD_LIMIT: {
    code: '999'
  }
};

export const ERRORS_TYPES = {
  TECHNICAL_ERROR: {
    KEY: 'TECHNICAL_ERROR',
    ROUTE: '/error?type=TECHNICAL_ERROR&id='
  },
  NBR_ALLOWED_DOWNLOADS_EXCEEDED: {
    KEY: 'DOWNLOAD_LIMIT',
    ROUTE: '/error?type=DOWNLOAD_LIMIT'
  },
  FRONT_ERROR: {
    KEY: '404 ',
    ROUTE: '/error?type=BASIC_404'
  },
  BACK_ERROR: {
    KEY: '500',
    ROUTE: '/error?type=BASIC_500'
  }
};
