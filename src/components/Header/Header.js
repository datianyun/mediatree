import React, {PropTypes, Component} from 'react'
import { IndexLink, Link } from 'react-router'
import classnames from 'classnames'
import './Header.scss'

class Header extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            activeTab : '1'
        }
    }
    handleClick(e){
        let target = e.target;
        if(target.nodeName === 'A'){
            let tid = target.dataset.id
            this.setState({activeTab:tid})
        }
    }
    render() {
        let activeTab = this.state.activeTab
        return (
            <div className="header">
                <div className="container">
                    <div className="navBanner" onClick={this.handleClick.bind(this)}>
                        <Link to='/account' className={classnames({
                            page:true,
                            on: activeTab === '1'
                        })} data-id="1">
                            帐号绑定
                        </Link>
                        <Link to='/search' className={classnames({
                            page:true,
                            on: activeTab === '2'
                        })} data-id="2">
                            关系查询管理
                        </Link>
                    </div>
                    <div className="userBanner">
                        <span className="ng-binding">欢迎你 yuntian</span>
            			<span className="ng-binding">子母帐号管理</span>
                        <span><a href="http://pass2.webdev.com/project/change?project_code=ommedia">[切换]</a></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
