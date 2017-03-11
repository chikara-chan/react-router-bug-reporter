const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack')

function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`
            return externals
        }, {})
}

const clientConfig = {
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: './client'
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
                    presets: ['es2015', 'react'],
                    plugins: ['add-module-exports'],
                    cacheDirectory: true
                }
            }
        ],
    },
    resolve: { extensions: ['.js'] }
}

const serverConfig = {
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
                    presets: ['es2015', 'react'],
                    plugins: ['add-module-exports'],
                    cacheDirectory: true
                }
            }
        ]
    },
    externals: getExternals(),
    resolve: { extensions: ['.js'] }
}

module.exports = [clientConfig, serverConfig]
