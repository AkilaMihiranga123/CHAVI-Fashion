import React, { Component } from 'react';
import './style.css';
import TopHeader from './TopHeader/TopHeader';
import MainHeader from './MainHeader/MainHeader';
import BottomHeader from './BottomHeader/BottomHeader';
import * as authActions from '../../actions/authActions';
import { connect } from 'react-redux';

class Header extends Component {

    logout = () => {
        this.props.logout();
    }

    render() {
        return (
            <header className="Header">
                <TopHeader logout={this.logout} />
                <MainHeader />
                <BottomHeader />
            </header>
        );
    }

}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken()),
        logout: () => dispatch(authActions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);