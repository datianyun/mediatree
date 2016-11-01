import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Menu.scss'

export const Menu = () => (
    <ul className="menu">
        <li className="active">
            <span className="menu-text">
                <span className="abr">
                    <i className="icon icon-menu-function"></i>
                </span>功能
            </span>
            <ul className="menu-sub">
                <li className="expServiceManage active">
                    <a href="/actManager" className="menu-sub-text ">体验活动管理</a>
                </li>
                <li className="articleManage">
                    <a href="/article/manage" className="menu-sub-text ">文章管理</a>
                </li>
            </ul>
        </li>
        <li>
            <span href="#" className="menu-text">
                <span className="abr">
                    <i className="icon icon-menu-setting"></i>
                </span>设置
            </span>
            <ul className="menu-sub">
                <li className="userAuthManage"><a href="/account/index" className="menu-sub-text">帐号管理</a></li>
                <li className="supplierManage"><a href="/org/index" className="menu-sub-text">运营商管理</a></li>
				<li className="supplyManage"><a href="/supplier/index" className="menu-sub-text">体验提供方管理</a></li>
            </ul>
        </li>
    </ul>
)

export default Menu
