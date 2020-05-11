import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const MainHeader = props => {
    return (
        <div className="MainHeader">
            <div></div>
            <div>
                <Link to="/cart"><i className="fas fa-shopping-cart">(0)</i></Link>
            </div>
        </div>
    );
}

export default MainHeader;