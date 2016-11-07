
import { connect } from 'react-redux'
import { actChange, actSearch } from '../modules/Account'

/*  container组件 只定义需要的action或者states*/

import Manager from '../components/Account'


const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
    account : state.account
})

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
