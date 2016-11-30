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
            key : ''
        }
    }

    componentDidMount() {
        const {fetchData} = this.props
        fetchData()
    }

    componentWillReceiveProps(nextProps) {

    }

    handleChange(e){
        let target = e.currentTarget
        this.setState({key:target.value})

    }
    handleSearch(e){
        e.preventDefault()
        const {fetchData} = this.props
        fetchData({
            key: this.state.key
        })
    }
    handleCancel(e){
        e.preventDefault()
        const {fetchData} = this.props
        this.setState({key:''})
        fetchData({
            key: ''
        })
    }
    pageClick(obj){
        const fetchData = this.props.fetchData
        const search = Object.assign({},{
            key: this.state.key
        },obj)
        fetchData(search)
    }
    render() {
        const {search,fetchData} = this.props
        const data = this.state.key
        return (
            <div className="search-container">
                <Header data={data}  handleSearch={this.handleSearch.bind(this)} handleChange={this.handleChange.bind(this)} handleCancel={this.handleCancel.bind(this)} ></Header>
                <Table fetchData={this.pageClick.bind(this)} data={search}></Table>
            </div>
        )
    }
}

Search.propTypes = {

}

export default Search
