import React, {Component,PropTypes} from 'react'
class SearchHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {data,handleSearch,handleChange,handleCancel} = this.props
        return (
            <form className="form-inline form-search">
                <input type="text" onChange={handleChange} value={data} placeholder="请输入母帐号ID" />
                <button type="submit" className="btn" onClick={handleSearch}>搜索</button>
                <button type="submit" className="btn" onClick ={handleCancel}>返回</button>
            </form>
        )
    }
}

SearchHeader.propTypes = {
    handleSearch : PropTypes.func,
    handleChange : PropTypes.func,
    handleCancel : PropTypes.func,
}

export default SearchHeader
