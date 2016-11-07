import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path : 'account',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
            dependencies for bundling   */
            const Manager = require('./containers/Container').default
            const reducer = require('./modules/Account').default

            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, { key: 'account', reducer })

            /*  Return getComponent   */
            cb(null, Manager)

            /* Webpack named bundle   */
        }, 'account')
  }
})
