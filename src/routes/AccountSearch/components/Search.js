import React, {Component,PropTypes} from 'react'
import moment from 'moment'
import Datetime from '../../../components/DateTime'
import Dialog from '../../../components/Dialog'
import Header from './SearchHeader'
import Table from './SearchTable'
import './Search.scss'
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        console.log(this.props)
        return (
            <div className="search-container">
                <Header></Header>
                <Table data={this.props.search.data}></Table>
            </div>
        )
    }
}

Search.propTypes = {

}

export default Search
