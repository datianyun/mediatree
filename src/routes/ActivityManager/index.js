import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path : 'actManager',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
            dependencies for bundling   */
            const Manager = require('./containers/ManagerContainer').default
            const reducer = require('./modules/manager').default

            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, { key: 'actManager', reducer })

            /*  Return getComponent   */
            cb(null, Manager)

            /* Webpack named bundle   */
        }, 'actManager')
  }
})
