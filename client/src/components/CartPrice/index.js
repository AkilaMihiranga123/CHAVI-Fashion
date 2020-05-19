import React from "react";
import './index.css';

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