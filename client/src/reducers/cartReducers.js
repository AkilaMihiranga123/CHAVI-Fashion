import {ADD_TO_CART, GET_CART_DETAILS, UPDATE_CART, CLEAR_CART} from "../actions/cartAction";

const initState = {
    cartItem : [],
    totalAmount : 0,
    cartCount : 0
}

const cartReducers = (state = initState, actions) =>{
    switch(actions.type) {
        case ADD_TO_CART:
            const cartItem = state.cartItem;
            let updatedCartItem = [];
            let totalAmount = 0

            const itemCount = state.cartItem.filter(item => item.product === actions.cartItem.product);

            if(itemCount.length === 0){
                updatedCartItem = [
                    ...cartItem,
                    {
                        product: actions.cartItem.product,
                        name: actions.cartItem.name,
                        image: actions.cartItem.image,
                        price: actions.cartItem.price,
                        quantity: actions.cartItem.quantity,
                        total: actions.cartItem.quantity * actions.cartItem.price
                    }
                ];
            }
    }
}

export default cartReducers();