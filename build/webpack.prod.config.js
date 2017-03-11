const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')
let clientConfig, serverConfig

function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`
            // console.log(`commonjs ${filename}`);
            return externals
        }, {})
}

clientConfig = {
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: './client',
        vendor: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['add-module-exports'],
                    cacheDirectory: true
                }
            }, {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: false
                }

            }
        ],
    },
    // postcss: [autoprefixer({ browsers: ['> 5%'] })],
    resolve: { extensions: ['.js', '.json', '.scss'] },
    plugins: [
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        }),
        new HtmlWebpackPlugin({
            filename: '../../views/prod/index.html',
            template: './views/tpl/index.tpl.html'
        })
    ]
}

serverConfig = {
    context: path.resolve(__dirname, '..'),
    entry: { server: './server/server.prod' },
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['add-module-exports'],
                    cacheDirectory: true
                }
            }, {
                test: /\.scss$/,
                use: [
                    // 'style-loader',
                    'css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]',
                    'sass-loader'
                ]
            }, {
                test: /\.(jpg|png|gif|webp)$/,
                loader: 'url-loader',
                options: {
                    limit: 8000
                }
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
     externals: getExternals(),//外部依赖，不打包
    resolve: { extensions: ['.js', '.json', '.scss'] },


    plugins: [
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
    ]
}

module.exports = [clientConfig, serverConfig]
