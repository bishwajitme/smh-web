'use strict';

module.exports = {
  entryFile: 'index.ec.js',
  outputFile: 'js.ec.js',
  confFile: 'config.ec.js', // file to use for config variables in app
  compressionRegExp: /js\.ec\.js$/,
  variableDir: 'ec-vars', // directory to use for variables.less
  // Variables to use in app
  dev: {
    sitename: 'EC Utbildning',
    hostname: 'http://localhost:8080/', // ADD DEV HOSTNAME
    wpJSONEndpoint: '/wp-json',
    assetsPath: '/wp-content/themes/ec-web/assets/',
    cacheTime: 0,
    menuID: 2,
    aboutLink: '/om-ecu',
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: '8D41BC1A-2513-4608-8FC7-4EBE5748FF9B',
    formChannel: 262,
    logo: {
      srcMain: 'ec-logo-full.svg',
      srcMono: 'ec-logo-mono.svg',
      alt: 'EC Utbildning Logo'
    },
  },
  stage: {
    sitename: 'EC Utbildning',
    hostname: 'http://www.demositestore.com', // ADD DEV HOSTNAME
    wpJSONEndpoint: '/wp-json',
    assetsPath: '/wp-content/themes/ec-web/assets/',
    cacheTime: 0,
    menuID: 2,
    aboutLink: '/om-ecu',
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: '8D41BC1A-2513-4608-8FC7-4EBE5748FF9B',
    formChannel: 262,
    logo: {
      srcMain: 'ec-logo-full.svg',
      srcMono: 'ec-logo-mono.svg',
      alt: 'EC Utbildning Logo'
    },
  },
  build: {
    sitename: 'EC Utbildning',
    hostname: 'http://www.ecutbildning.se',
    wpJSONEndpoint: '/wp-json',
    assetsPath: '/wp-content/themes/ec-web/assets/',
    cacheTime: 3600000,
    menuID: 2,
    aboutLink: '/om-ecu',
    formGetEndpoint: '/wp-admin/admin-ajax.php?action=ec_get_educations',
    formPostEndpoint: '/wp-admin/admin-ajax.php?action=ec_submit',
    formKey: '8C29A059-1B7C-4B6E-AA3A-CAFB8351F3BE',
    formChannel: 278,
    logo: {
      srcMain: 'ec-logo-full.svg',
      srcMono: 'ec-logo-mono.svg',
      alt: 'EC Utbildning Logo'
    },
  },
};
