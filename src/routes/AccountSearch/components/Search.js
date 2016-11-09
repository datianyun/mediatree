import React, {Component,PropTypes} from 'react'
import moment from 'moment'
import Datetime from '../../../components/DateTime'
import Dialog from '../../../components/Dialog'
import Header from './SearchHeader'
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
            <div>
                <Header></Header>
            </div>
        )
    }
}

Search.propTypes = {

}

export default Search
