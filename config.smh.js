'use strict';

module.exports = {
  entryFile: 'index.smh.js',
  outputFile: 'js.smh.js',
  confFile: 'config.smh.js',
  compressionRegExp: /js\.smh\.js$/,
  variableDir: 'smh-vars',
  // Variables to use in app
  dev: {
    sitename: 'Sälj&Marknadshögskolan',
    hostname: 'http://smhdemo.demositestore.com',
    wpJSONEndpoint: '/wp-json',
    assetsPath: '/wp-content/themes/ec-web/assets/',
    cacheTime: 0,
    menuID: 2,
    aboutLink: '/om-smh',
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: '8D41BC1A-2513-4608-8FC7-4EBE5748FF9B',
    formChannel: 262,
    logo: {
      srcMain: 'smh-logo.svg',
      srcMono: 'smh-logo-footer.svg',
      alt: 'Sälj- och marknadshögskolan Logo'
    },
  },
  stage: {
    sitename: 'Sälj&Marknadshögskolan',
    hostname: 'http://smhdemo.demositestore.com',
    wpJSONEndpoint: '/wp-json',
    assetsPath: '/wp-content/themes/ec-web/assets/',
    cacheTime: 3600000,
    menuID: 2,
    aboutLink: '/om-smh',
    formGetEndpoint: '/proxy/api/v1.0/educationtree',
    formPostEndpoint: '/proxy/api/v1.0/candidate',
    formKey: '8D41BC1A-2513-4608-8FC7-4EBE5748FF9B',
    formChannel: 262,
    logo: {
      srcMain: 'smh-logo.svg',
      srcMono: 'smh-logo-footer.svg',
      alt: 'Sälj- och marknadshögskolan Logo'
    },
  },
  build: {
    sitename: 'Sälj & Marknadshögskolan',
    hostname: 'https://www.smhsverige.se',
    wpJSONEndpoint: '/wp-json',
    assetsPath: '/wp-content/themes/ec-web/assets/',
    cacheTime: 3600000,
    menuID: 2,
    aboutLink: '/om-smh',
    formGetEndpoint: '/wp-admin/admin-ajax.php?action=ec_get_educations',
    formPostEndpoint: '/wp-admin/admin-ajax.php?action=ec_submit',
    formKey: '4C063676-4449-46AB-AFBE-EE67F4B04A1A',
    formChannel: 295,
    logo: {
      srcMain: 'smh-logo.svg',
      srcMono: 'smh-logo-footer.svg',
      alt: 'Sälj- och marknadshögskolan Logo'
    },
  },
};
