import { connect } from 'react-redux'
import { fetchData, mediaSearch } from '../modules/Search'
import Manager from '../components/Search'


const mapDispatchToProps = {
    fetchData,
    mediaSearch
}

const mapStateToProps = (state) => ({
    search : state.search
})

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
