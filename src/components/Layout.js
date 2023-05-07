import React from 'react'

import Header from './Header'
// import Footer from './Footer'
import *  as globalStyles from '../styles/global.module.scss'
import {theme} from '../styles/utilities'
import {ThemeProvider} from '@mui/material'

const Layout = (props) => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Header />
                <div className={globalStyles.container}>
                    <div className={globalStyles.content}>
                        {props.children}           
                    </div>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Layout