import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CartPrice = props => {
    return(
        <div className="PriceWrapper">
            <div className="CardTittle">
                <h3>Price Details</h3>
            </div>
            <div className="CardBody">
                <div className="FinalBilling">
                    <div className="Row">
                        <p>Price ({props.cart.cartCount})</p>
                        <p>${props.cart.totalAmount}</p>
                    </div>
                    <div className="Row">
                        <p>Delivery</p>
                        <p>$0</p>
                    </div>
                    <hr />
                    <div className="Row">
                        <h4>Total Payable</h4>
                        <h4>${props.cart.totalAmount}</h4>
                    </div>
                    <div className="col-lg-12">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Link to={"/place-order"} className="btn btn-warning btn-lg btn-block"><i className="fas fa-cart-arrow-down"></i>&nbsp;Place Order</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

const mapStateToProps = state => {
    return{
        cart: state.cart
    }
}

export default connect(mapStateToProps, null)(CartPrice);