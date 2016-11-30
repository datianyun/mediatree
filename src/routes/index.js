// We only need to import the modules necessary for initial render
import CoreLayout from '../components/CoreLayout/CoreLayout'
import accountRoute from './AccountSetting'
import searchRoute from './AccountSearch'
import logRoute from './Log'

export const createRoutes = (store) => ({
    path        : '/',
    component   : CoreLayout,
    indexRoute  : accountRoute(store),
    childRoutes : [
        accountRoute(store),
        searchRoute(store),
        logRoute(store)
    ]
})

export default createRoutes
