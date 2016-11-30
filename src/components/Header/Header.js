import React, {PropTypes, Component} from 'react'
import { IndexLink, Link } from 'react-router'
import classnames from 'classnames'
import './Header.scss'

class Header extends Component {
    constructor(props, context) {
        super(props, context)
        let activeTab = this.initialMenu()
        this.state = {
            activeTab : activeTab
        }
    }
    initialMenu(){
        let path = window.location.pathname
        let result = '1'
        switch(path){
            case '/search' :
                result = '2'
                break
            case '/account' :
                result = '1'
                break
            case '/log' :
                result = '3'
                break
            default :
                result = '1'
        }
        return result
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
        const userName = g_userInfo.user
        const gtype = g_userInfo.site
        const pname = gtype === 'tree_government' ? '政府类子母帐号管理' : '非政府类子母帐号管理'
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
                        <Link to='/log' className={classnames({
                            page:true,
                            on: activeTab === '3'
                        })} data-id="3">
                            日志查询
                        </Link>
                    </div>
                    <div className="userBanner">
                        <span className="ng-binding">欢迎你 {userName}</span>
            			<span className="ng-binding">{pname}</span>
                        <span><a href="http://pass2.webdev.com/project/change?project_code=mediatree">[切换]</a></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
