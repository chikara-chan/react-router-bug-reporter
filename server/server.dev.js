require('babel-polyfill')

require('babel-register')({
    presets:['es2015','react'],
    plugins:['add-module-exports']
})

const Koa = require('Koa'),
    app = new Koa(),
    convert = require('koa-convert'),
    webpack = require('webpack'),
    path = require('path'),
    devMiddleware  = require('koa-webpack-dev-middleware'),
    hotMiddleware= require('koa-webpack-hot-middleware'),
    views = require('koa-views'),
    clientRoute = require('./middlewares/clientRoute'),
    config = require('../build/webpack.dev.config'),
    compiler = webpack(config)


app.use(views(path.resolve(__dirname,'../views'),{
    map:{
        html:'ejs'
    }
}))

app.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
})))
app.use(convert(hotMiddleware(compiler)))
app.use(clientRoute)


app.listen(3000)
console.log(`\n==> 🌎  Listening on port 3000. Open up http://localhost:3000/ in your browser.\n`)
