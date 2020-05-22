import React, {Component} from "react"
import Header from "../../components/Header/Header";
import * as authActions from '../../actions/authActions';
import {connect} from 'react-redux';
import {base_url} from "../../constants";

class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orderList: []
        }
    }

    getOrder = () => {
        console.log(this.props.auth.isAuthenticated);
        const token =  this.props.auth.token;
        const userId = this.props.auth.user.user_id;
        fetch(`${base_url}/order/getorders/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    ordersList: jsonResponse.message
                });
            })
            .catch(error => {
                console.log(error);
            })
    };


    componentDidMount() {
        if (this.props.auth.isAuthenticated){
            this.props.getToken().then(result => {
                if(result){
                    this.getOrder();
                }else{
                    this.props.history.push('/login');
                }
            })
        }else{
            this.getOrder();
        }
    }

    getTotalOrder = (id) => {
        const  oneOrder = this.state.orderList.find(this.order._id===id);
        let totalOrder = 0;
        oneOrder.order.forEach(order => {
            totalOrder = totalOrder + (order.price*order.quantity)
        });
        return totalOrder;
    };

    dateFormat = (date) => {
        let Date = new Date(date);
        return '${Date.getDate()}/${Date.getMonth() + 1}/${Date.getFullYear()}';
    };

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="row mt-5">
                    <div className="col-md-4 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3"><i className="fas fa-user-plus"/>MY ORDER</h1>
                            {
                                this.state.ordersList.map(order => {
                                    return (
                                        <div key={order._id} className="Order">
                                            <div className="OrderHeader">
                                                <a href="#">{order._id}</a>
                                            </div>
                                            <div className="OrderDescription">
                                                <div className="od1">
                                                    <p className="odtitle">Delivered Address</p>
                                                    <p>{`${order.address.address} ${order.address.cityTownDistrict} ${order.address.state} - ${order.address.pinCode}`}</p>
                                                </div>
                                                <div className="od2">
                                                    <p className="odtitle">Payment Type</p>
                                                    <a className="odp">{order.paymentType}</a>
                                                </div>
                                                <div className="od3">
                                                    <p className="odtitle">Payment Status</p>
                                                    <a className="odp">{order.paymentStatus}</a>
                                                </div>

                                            </div>
                                            <div>
                                                {order.order.map(item => (
                                                    <div key={item._id} style={{display: 'flex', alignItems: 'center', margin: '5px 0', borderBottom: '1px solid #cecece'}}>
                                                        <div style={{width: '80px', height: '80px', overflow: 'hidden', position: 'relative'}} className="ImageContainer">
                                                            <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={item.product.productPic[0].img}/>
                                                        </div>
                                                        <div>
                                                            <p className="odtitle">{item.product.name}</p>
                                                            <div style={{fontSize: '14px', color: '#555', fontWeight: 'bold'}}>
                                                                <p>Quantity: {item.quantity}</p>
                                                                <p>${item.price * item.quantity}</p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="OrderFooter">
                                                <p>Ordered On <span>{this.dateFormat(order.orderDate)}</span></p>
                                                <p>Order Total <span>${this.getTotalOrder(order._id)}</span></p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken())
    }
};


export default  connect(mapDispatchToProps, mapDispatchToProps)(Orders);

