// Hook for server
if(typeof require.ensure !=='function'){
    require.ensure = function(dependencies,callback){
        callback(require)
    }
}
const routes = {
    childRoutes:[{
        path:'/',
        component:require('./components/App'),
        indexRoute:{
            getComponent(nextState,callback){
                require.ensure([],require=>{
                    callback(null,require('./components/Section'))
                }, 'section')
            }
        }
    }]
}

export default routes
