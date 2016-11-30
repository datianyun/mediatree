import { connect } from 'react-redux'
import { fetchData, mediaSearch } from '../modules/Log'
import Manager from '../components/Log'


const mapDispatchToProps = {
    fetchData,
    mediaSearch
}

const mapStateToProps = (state) => ({
    log : state.log
})

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
