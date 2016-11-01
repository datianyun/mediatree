
import { connect } from 'react-redux'
import { actChange, actSearch } from '../modules/manager'

/*  container组件 只定义需要的action或者states*/

import Manager from '../components/Manager'


const mapDispatchToProps = {
    
}

const mapStateToProps = (state) => ({
    actManager : state.actManager
})

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
