'use strict';

var theme = process.env.theme;
var webpack_config_prod = require('./webpack.config.prod.js');
var config = require('./config.' + theme + '.js');

module.exports = webpack_config_prod(config);