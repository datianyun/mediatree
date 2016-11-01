import React, {Component,PropTypes} from 'react'

class SearchBar extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <div className="breadcrumb-mod">
                <div className="expStatusCon">
                    <select id="expStatus" name="select" className="form-control input-sm" size="1">
                        <option value="0">全部活动状态</option>
                        <option value="2">审核通过</option>
                        <option value="1">待审核</option>
                        <option value="3">审核未通过</option>
                        <option value="5">活动撤回</option>
                    </select>
                </div>
                <div className="expNameCon">
                    <input type="text" name="input2-group2" className="form-control" placeholder="体验ID/体验名称"/>
                </div>
                <div className="input-group-btn">
                    <button type="button" className="btn btn-primary search">搜索</button>
                    <button type="button" className="btn btn-secondary back">返回</button>
                </div>
                <div className="option">
                    <a href="/activity" className="btn btn-primary create-expService-btn">创建体验活动</a>
                </div>
            </div>
        )
    }
}

SearchBar.propTypes = {

}

export default SearchBar
