import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Menu from '../../components/Menu'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
    <div className='viewpage'>
        <Header />
        <div className='wrap clearfix'>
            <Menu></Menu>
            <div className="main">
                {children}
            </div>
        </div>
    </div>
)

CoreLayout.propTypes = {
    children : React.PropTypes.element.isRequired
}

export default CoreLayout
