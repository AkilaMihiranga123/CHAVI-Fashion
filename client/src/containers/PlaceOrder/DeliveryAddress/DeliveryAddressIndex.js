import React,{Component} from 'react';
import Header from "../../../components/Header/Header";
import * as authActions from '../../actions/authActions';
import { connect } from 'react-redux';
import AddressForm from "../AddressForm/AddressFormIndex";
import DeliveryAddress from '../DeliveryAddress';
//import CartPrice from '../../components/CartPrice';
//import * as cartActions from '../../store/actions/cartActions';
import { base_url } from "../../../constants";

class PlaceOrder extends Component{
    state = {
        addresses: [],
        address: {
            fullName: "",
            mobileNumber: "",
            pinCode: "",
            locality: "",
            address: "",
            cityTownDistrict: "",
            state: "",
            landmark: "",
            alternatePhoneNumber: ""
        },
        order: [],
        selectedAddress: '',
        existingAddress: false,
        newAddress: false,
        isAddressConfirm: false,
        isOrderConfirm: false,
        selectedPaymentType: 'cod',
        paymentTypes: [
            {id: 1, value: 'card', label: 'Credit Card / Debit Card / ATM Card', isActive: false},
            {id: 2, value: 'netBanking', label: 'Net Banking', isActive: false},
            {id: 3, value: 'paypal', label: 'Paypal', isActive: false},
            {id: 4, value: 'cod', label: 'Cash on Delivery', isActive: true},
        ]
    };

    getAddresses = () => {
        const userId = this.props.auth.user.user_id;
        fetch(`${base_url}/user/get-addresses/`+userId, {
            headers: {
                'auth-token': this.props.auth.token
            }
        })
            .then(response => {
                if(response.status === 200){
                    return response.json();
                }else{
                    throw new Error('Something went wrong');
                }
            })
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    addresses: jsonResponse.message.address
                })
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    if(result){

                        this.getAddresses();

                    }else{
                        this.props.history.push('/login');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }else{
            this.getAddresses();
        }
    }

    inputHandler = (e) => {
        const address = this.state.address;
        const updatedAddress = {
            ...address,
            [e.target.name] :  e.target.value
        };
        this.setState({
            address: updatedAddress
        })
    };

    addressSelector = (e) => {
        this.setState({
            selectedAddress: e.target.value,
            existingAddress: true,
            newAddress: false
        });
    };

    newAddressSelection = (e) => {
        this.setState({
            selectedAddress: 'newAddressId',
            existingAddress: false,
            newAddress: true
        });
    };

    addressSubmitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.address);

        const address = {
            userId: this.props.auth.user.userId,
            address: this.state.address
        };

        fetch(`${base_url}/user/new-address`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': this.props.auth.token
            },
            method: 'POST',
            body: JSON.stringify(address)
        })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log('new address');
                console.log(jsonResponse);
                console.log('new address');

                const updatedAddressList = jsonResponse.message.address;
                this.setState({
                    isAddressConfirm: true,
                    address: {
                        ...this.state.address,
                        ...address.address
                    },
                    addresses: updatedAddressList,
                    selectedAddress: updatedAddressList[updatedAddressList.length - 1]._id
                });

            })
            .catch(error => {
                console.log(error);
            })
    };

    confirmDeliveryAddress = () => {
        this.setState({
            isAddressConfirm: true
        });
    };

    confirmOrder = () => {
        this.setState({
            isOrderConfirm: true
        })
    };

    selectPaymentOption = (e) => {
        this.setState({
            selectedPaymentType: e.target.value
        })
    };

    submitOrder = async () => {
        if(!this.state.isOrderConfirm){
            return;
        }
        if(this.state.selectedPaymentType !== 'cod'){
            return;
        }
        const order = this.props.cart.cartItem.map(item => {
            return {
                product: item.product,
                price: item.price,
                quantity: item.quantity
            }
        });
        try{
            const response = await fetch(`${base_url}/order/create`,{
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': this.props.auth.token
                },
                body: JSON.stringify({
                    user: this.props.auth.user.userId,
                    address: this.state.selectedAddress,
                    order: order,
                    paymentType: 'COD',
                    paymentStatus: 'pending'
                }),
                method: 'POST'
            });
            const jsonResponse = await response.json();
            if(response.status === 201){
                this.props.clearCart();
                this.props.history.push({
                    pathname: '/thank-you',
                    search: '?orderid='+jsonResponse.message._id,
                    state: jsonResponse.message
                });
            }
        }catch(error){
            console.log(error);
        }
    };
}
