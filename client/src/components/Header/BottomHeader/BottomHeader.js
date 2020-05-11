import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class BottomHeader extends Component{
    render() {
        return (
            <div className="BottomHeader">
                <ul className="Menu">
                    <li className="MenuItem"><Link to="/"><i className="fas fa-home"></i></Link></li>
                    <li className="MenuItem">
                        <Link to="/products/all" className="MenuItemElement">Shop&nbsp;<i className="fas fa-caret-down"></i></Link>
                    </li>
                    <li className="MenuItem"><Link to="/categories">Categories</Link></li>
                    <li className="MenuItem"><Link to="/contact-us">Contact Us</Link></li>
                    <li className="MenuItem"><Link to="/about-us">About Us</Link></li>
                </ul>
            </div>
        );
    }
}
export default BottomHeader;