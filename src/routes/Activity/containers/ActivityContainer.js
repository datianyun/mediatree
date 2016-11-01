
import { connect } from 'react-redux'
import { actChange, actSearch } from '../modules/activity'

/*  container组件 只定义需要的action或者states*/

import Activity from '../components/Activity'


const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
    activity : state.activity
})

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
