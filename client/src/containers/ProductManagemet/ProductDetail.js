import React, {Component} from 'react';
import axios from 'axios';
import Header from "../../components/Header/Header";
import ProductImageGallery from "./ProductImageGallery";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as cartActions from '../../actions/cartAction';
import * as authActions from '../../actions/authActions';
class ProductDetail extends Component{

    constructor(props) {
        super(props);

        this.state = {
            product: []
        }
    }
    
    componentDidMount() {

        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
            .then(result => {
                if(result){
                    this.props.getCartItems(this.props.auth.token, this.props.auth.user.user_id)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
        }

        const id = this.props.match.params.productId;
        axios.get(`http://localhost:5000/product/product_id?id=${id}&type=single`)//get product details using product id
            .then(response => {
                this.setState({
                    product: response.data[0]
                })
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    addToCart = (productId, price, name, image) => {

        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
            return;
        }

        const { auth } = this.props;
        const cartItem = {
            user: auth.user.user_id,
            product: productId,
            name: name,
            image: image,
            quantity: 1,
            price: price
        }
        console.log(cartItem);
        this.props.addToCart(auth.token, cartItem)
        .then(response => {
            //console.log(response);
            console.log(this.props.cart);
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        
        return (
            <div>
                <Header/>
                <div className="col-md-10 m-auto">
                    <div className="card card-body">
                    <h1 className="text-center"> {this.state.product.product_name} </h1>
                      <div className="card card-body">
                        <div className="row">
                                <div className="col-md-5 lg">
                                    <ProductImageGallery detail={this.state.product} />
                                </div>
                                <div className="col-md-6 lg-2">
                                    <div className="card card-body">
                                    <div className="jumbotron bg-light">
                                         <h3>Product Name: </h3><p>{this.state.product.product_name}</p><hr/>
                                         <h3>Product Price: </h3><p>Rs. {this.state.product.product_price} /=</p><hr/>
                                         <h3>Product Description: </h3><p>{this.state.product.product_description}</p><hr/>
                                         <h3>Product Category: </h3><p>{this.state.product.category}</p><hr/>
                                        <h3>Call Us On 0778990415 For More Details.</h3><br/>
    
                                        <div className="col-lg-12">
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Link to={"/path/"+this.state.product._id} className="btn btn-outline-info btn-lg btn-block">Add To Wish List</Link>
                                            </div><br/>
                                        </div>
                                        <div className="col-lg-12">
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button className="btn btn-outline-warning btn-lg btn-block" onClick={() => { this.addToCart(this.state.product._id, this.state.product.product_price, this.state.product.product_name, this.state.product.product_image[0]) }}><i className="fas fa-shopping-cart"></i>&nbsp;ADD TO CART</button>
                                            </div>
                                        </div>     
                                        
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-5 lg-2">
                                <div className="card card-body"><br/><br/>
                                    <h1 className="text-center"> Add Your Comments ... </h1><hr/>
                                     
                                     </div>
                                </div>

                               <div className="col-md-6 lg-2">
                               <div className="card card-body" style={{backgroundColor: '#FFF0F5'}}><br/><br/>
                                     <h1 className="text-center"> Comments List  </h1><hr/>
                                         
                                </div>
                                </div>   
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        )
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
        addToCart: (token, cartItem) => dispatch(cartActions.addToCart(token, cartItem)),
        getCartItems: (token, user_id) => dispatch(cartActions.getCartItems(token, user_id)),
        getToken: () => dispatch(authActions.getToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
