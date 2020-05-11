import React, { Component } from 'react';
import './style.css';
import Products from '../../components/ShopStore/Products/Products';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header/Header';


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