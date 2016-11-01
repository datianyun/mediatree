import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Footer.scss'

export const Footer = () => (
    <div className="footer">
        <p className="footermenu">
            <a href="http://www.tencent.com/" rel="nofollow" target="_blank">关于腾讯</a>
            | <a href="http://www.qq.com/contract.shtml" rel="nofollow" target="_blank">服务协议</a>
            | <a href="http://service.qq.com/" rel="nofollow" target="_blank">客服中心</a>
        </p>

        <p className="copyrighten">
            Copyright©
            <script>document.write(new Date().getFullYear());</script>2016
            Tencent. <a rel="nofollow" href="http://www.tencent.com/en-us/le/copyrightstatement.shtml" target="_blank">All
                Rights Reserved</a>
        </p>
    </div>
)

export default Footer
