import React, {PropTypes, Component} from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

class Header extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            key :''
        }
    }
    handleClick(e){
        let target = e.currentTarget;
        target.classList.toggle('show');
    }
    render() {
        return (
            <div className="header">
                <div className="container">
                    <h1 className="logo">
                        <a href="/main/index" className="logo-link text-hide"></a>
                    </h1>
                    <div className="header-login" onClick={this.handleClick.bind(this)}>
                        <div className="user">
                            <span className="name">tianyun<i className="caret" id="dropdown"></i></span>
                        </div>
                        <ul className="dropdown-menu">
                            <li><a href="/account/signOut">退出</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
