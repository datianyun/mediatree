import React, {Component,PropTypes} from 'react'
class SearchTable extends Component {
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
        return (
            <form className="form-inline form-search">
                <input type="text" placeholder="支持媒体id，媒体名，注册邮箱搜索" />
                <button type="submit" className="btn">搜索</button>
                <button type="submit" className="btn">返回</button>
            </form>
        )
    }
}

SearchTable.propTypes = {

}

export default SearchTable
