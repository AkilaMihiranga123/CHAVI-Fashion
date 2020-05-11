import React, { Component } from 'react';
import './style.css';
import Products from './Products/Products';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';


class ShopStore extends Component{

    render() {

        return (
            <React.Fragment>
                <Header/>
                <Switch>
                    <Route path="/" exact component={Products} />
                </Switch>
            </React.Fragment>

        );
    }
}



export default ShopStore;