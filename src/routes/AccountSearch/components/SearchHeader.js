import React, {Component,PropTypes} from 'react'
class SearchHeader extends Component {
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
                <input type="text" placeholder="请输入帐号id，媒体名或注册邮箱" />
                <button type="submit" className="btn">搜索</button>
                <button type="submit" className="btn">返回</button>
            </form>
        )
    }
}

SearchHeader.propTypes = {

}

export default SearchHeader
