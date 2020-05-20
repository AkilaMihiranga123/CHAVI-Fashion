import {base_url} from "../../";
import CartItem from "../containers/Cart/CartItem";

export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_CART_DETAILS = 'GET_CART_DETAILS';
export const UPDATE_CART = 'UPDATE_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (token, cartItem) => {
    return async dispatch => {
        try{
            const response = await fetch(`${base_url}/cart/add`,{
                headers: {
                    'Content-type' : 'application/json',
                    'auth-token' : token
                },
                body: JSON.stringify(cartItem),
                method: 'POST'
            });
            const jsonResponse = await response.json();
            if(response.status === 201){
                dispatch({
                    type: ADD_TO_CART,
                    cartItem : CartItem
                });
            }

            return jsonResponse;
        }catch (error) {
            console.log(error);
        }
    }
}

export const getCartItems = (token, userId) => {
    return async dispatch => {
        
        try{
            const response = await fetch(`${base_url}/cart/user/${userId}`,{
                headers: {
                    'content-type' : 'application/json',
                    'auth-token' : token
                },
                method: 'POST'
            });

            const jsonResponse = await response.json();
            if (response.status === 200){
                dispatch({
                    type: GET_CART_DETAILS,
                    cartItem: jsonResponse.message[0]
                });
            }

            return jsonResponse.message[0];

        }catch (error) {
            console.log(error);
        }
    }
}

export const updateCart = (token, userId, product) => {
    return async dispatch => {
        try{
            const response = await fetch(`${base_url}/cart/update/quantity`,{
                headers: {
                    'content-type' : 'application/json',
                    'auth-token' : token
                },
                method : 'PUT',
                body : JSON.stringify({
                    userId : userId,
                    productId : product.productId,
                    quantity : product.quantity,
                    total : product.total
                })
            });

            const jsonresponse = await response.json();

            if (response.status === 201){
                dispatch({
                    type : UPDATE_CART,
                    item : product
                });
            }

            return jsonresponse.message;

        }catch (error) {
            console.log(error);
        }
    }
}

export const clearCart = () => {
    return dispatch => {
        dispatch({
            type : CLEAR_CART,
            payload : null
        });
    }
}