import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path : 'test',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
            dependencies for bundling   */
            const Counter = require('./containers/Container').default
            const reducer = require('./modules/Counter').default

            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, { key: 'counter', reducer })

            /*  Return getComponent   */
            cb(null, Counter)

            /* Webpack named bundle   */
        }, 'test')
  }
})
