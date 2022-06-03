var theme = process.env.theme;
var themeConfig = require('./config.' + theme + '.js');
var webpack_config_dev = require('./webpack.config.dev');
var webpack_server = require('./webpack.server.js');

var config = webpack_config_dev(themeConfig);
webpack_server(config);