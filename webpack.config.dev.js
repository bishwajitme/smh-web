var path = require('path');
var webpack = require('webpack');
var postcssImport = require('postcss-import');
var cssvariables = require('postcss-css-variables');
var autoprefixer = require('autoprefixer');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var replace = require("replace");

module.exports = function (config) {

    // Replace src for js-app in index.html
    replace({
        regex: /js\.\w*\.js/,
        replacement: config.outputFile,
        paths: ['index.html'],
        recursive: true,
        silent: true,
    });

    return {
        entry: [
            'webpack/hot/only-dev-server',
            './sourcecode/' + config.entryFile,
        ],
        // Set variableDir as moduleDirectory so that
        // variables will be found using @import '~variables.less';
        resolve: {
            root: __dirname,
            alias: {
                conf: config.confFile,
            },
            extensions: ['', '.js', '.less'],
            modulesDirectories: ["web_modules", "node_modules", config.variableDir],
        },
        // Which object in config to be used, dev or build.
        loader: {
            configEnvironment: 'dev',
        },
        devtool: "eval",
        output: {
            path: __dirname,
            filename: config.outputFile,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new StringReplacePlugin(),
        ],
        module: {
            loaders: [
                {
                    test: /\.js?$/,
                    include: path.join(__dirname, './sourcecode'),
                    loaders: ['react-hot', 'babel'],
                },
                {
                    test: /\.less$|\.css$/,
                    include: path.join(__dirname, './sourcecode'),
                    loader: 'style-loader?singleton!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader!less-loader',
                }
            ],
        },
        postcss: [autoprefixer({browsers: ['last 2 versions', 'ie >= 9']})]
    }
};
