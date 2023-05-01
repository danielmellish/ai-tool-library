import React from 'react'

// import Header from './Header'
// import Footer from './Footer'
import *  as globalStyles from '../styles/global.module.scss'

const Layout = (props) => {
    return (
        <div className={globalStyles.container}>
            <div className={globalStyles.content}>
                {props.children}           
            </div>
        </div>
    )
}

export default Layout