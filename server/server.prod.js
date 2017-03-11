import 'babel-polyfill'
import Koa from 'koa'
import serve from 'koa-static'
import path from 'path'
import views from 'koa-views'
import clientRoute from './middlewares/clientRoute'

const app = new Koa()

app.use(views(path.resolve(__dirname, '../views'), {
    map: {
        html: 'ejs'
    }
}))
app.use(serve(path.resolve(__dirname, '../dist/client')))
app.use(clientRoute)
app.listen(3000)
console.log(`\n==> 🌎  Listening on port 3000. Open up http://localhost:3000/ in your browser.\n`)
