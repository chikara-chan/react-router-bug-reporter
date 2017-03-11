import React from 'react'
import {renderToString} from 'react-dom/server'
import {match,RouterContext} from 'react-router'
import routes from '../../client/routes'

async function clientRoute(ctx){
    let _renderProps

    match({routes,location:ctx.url},(error,redirectLocation,renderProps)=>{
        console.log(renderProps)
        _renderProps=renderProps
        console.log(1)
    })
    console.log(2)

    await ctx.render('index',{
        root: renderToString(
                <RouterContext {..._renderProps}/>
        )
    })
}

export default clientRoute
