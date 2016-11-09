
import { connect } from 'react-redux'
import { actChange, actSearch } from '../modules/Search'

/*  container组件 只定义需要的action或者states*/

import Manager from '../components/Search'


const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
    search : state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
