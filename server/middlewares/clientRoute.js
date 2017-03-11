import React from 'react'
import {renderToString} from 'react-dom/server'
import {match,RouterContext} from 'react-router'
import routes from '../../client/routes'

async function clientRoute(ctx){
    let _renderProps

    console.log('\x1b[41m', 'before match','\x1b[0m')
    match({routes,location:ctx.url},(error,redirectLocation,renderProps)=>{
        console.log('\x1b[41m', 'callback','\x1b[0m')
        _renderProps=renderProps
    })
    console.log('\x1b[41m', 'after match','\x1b[0m')

    await ctx.render('index',{
        root: renderToString(
                <RouterContext {..._renderProps}/>
        )
    })
}

export default clientRoute
