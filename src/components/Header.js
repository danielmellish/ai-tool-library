import React from 'react'
import { Link, navigate } from 'gatsby'

import * as globalStyles from '../styles/global.module.scss'

const Header = (props) => {

    return (
        <header className={globalStyles.header}>
            <nav className={globalStyles.navBar}>
                <Link className={globalStyles.navLogoItem} to={'/'}>AI Tool Library</Link>
                <ul className = {globalStyles.navList}>
                    <li><Link  className={globalStyles.navItem} activeClassName={globalStyles.activeNavItem} to={'/'}><span activeClassName={globalStyles.activeNavItemText} className={globalStyles.navItemText}>Home</span></Link></li>
                    <li><Link  className={globalStyles.navItem} activeClassName={globalStyles.activeNavItem} to="/how-it-works"><span className={globalStyles.navItemText}>How It Works</span></Link></li>
                    <li><Link  className={globalStyles.navItem} activeClassName={globalStyles.activeNavItem} to="/contact-us"><span className={globalStyles.navItemText}>Contact Us</span></Link></li>
                    <li><Link  className={globalStyles.navItem} activeClassName={globalStyles.activeNavItem} to="/about-us"><span className={globalStyles.navItemText}>About Us</span></Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header