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
            <div className="side">
                <Menu />
            </div>
            <div className="main">
                {children}
            </div>
        </div>
        <Footer />
    </div>
)

CoreLayout.propTypes = {
    children : React.PropTypes.element.isRequired
}

export default CoreLayout
