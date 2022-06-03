var webpack = require('webpack');
var path = require('path');
var postcssImport = require('postcss-import');
var cssvariables = require('postcss-css-variables');
var autoprefixer = require('autoprefixer');
var CompressionPlugin = require('compression-webpack-plugin');
module.exports = function (config) {
    return {
        entry: './sourcecode/' + config.entryFile,
        // Set variableDir as moduleDirectory so that
        // variables will be found using @import '~variables.less';
        resolve: {
            root: __dirname,
            alias: {
                conf: config.confFile,
            },
            extensions: ['', '.js', '.less', '.jsx', '.json'],
            modulesDirectories: ["web_modules", "node_modules", config.variableDir],
        },
        loader: {
            configEnvironment: 'build',
        },
        output: {
            path: path.join(__dirname),
            filename: config.outputFile,
            publicPath: '/'
        },

        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false}
            }),
            new CompressionPlugin({
                asset: "{file}.gz",
                algorithm: "gzip",
                regExp: config.compressionRegExp,
                threshold: 10240,
                minRatio: 0.8
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: ['babel'],
                    query: {
                        optional: ['runtime'],
                        externalHelpers: true,
                        stage: 0
                    }
                },
                {
                    test: /\.less$|\.css$/,
                    include: path.join(__dirname, './sourcecode'),
                    loader: 'style-loader?singleton!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader!less-loader',
                },
            ]
        },
        postcss: [autoprefixer({browsers: ['last 2 versions', 'ie >= 9']})]
    };
};
