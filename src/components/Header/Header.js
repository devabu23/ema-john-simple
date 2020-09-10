import React from 'react';
import logo from '../../image/logo.png'
import './header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage Inventory</Link>
            </nav>
        </div>
    );
}

export default Header;