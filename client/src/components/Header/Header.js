import React, { Component } from 'react';
import './style.css';
import TopHeader from './TopHeader/TopHeader';
import MainHeader from './MainHeader/MainHeader';
import BottomHeader from './BottomHeader/BottomHeader';
import * as authActions from '../../actions/authActions';
import { connect } from 'react-redux';
import * as cartActions from '../../actions/cartAction';

class Header extends Component {

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
            .then(result => {

                if(result){
                    this.props.getCartItems(this.props.auth.token, this.props.auth.user.user_id)
                }

            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    logout = () => {
        this.props.logout();
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const {cart} = this.props;
        const cartCount = isAuthenticated ? cart.cartCount : '';

        return (
            <header className="Header">
                <TopHeader logout={this.logout} />
                <MainHeader cartCount={cartCount} />
                <BottomHeader />
            </header>
        );
    }

}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken()),
        logout: () => dispatch(authActions.logout()),
        getCartItems: (token, user_id) => dispatch(cartActions.getCartItems(token, user_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);