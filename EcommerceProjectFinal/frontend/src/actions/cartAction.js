import axios from 'axios';
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from '../constants/cartConstants';
import { json } from 'react-router-dom';

export const addToCart = (id,qty)=> async (dispatch,getState) => {
    try{
        const {data}= await axios.get(`/api/products/${id}`);
        //const {data} = await axios.get('/api/products');

        dispatch({
            type:CART_ADD_ITEM,
            payload:{
                product:data._id,
                name:data.name,
                price:data.price,
                Image:data.image,
                qty,
                countInStock:data.countInStock
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }
    catch(err) {console.log("error:", err)}
}

export const removeFromCart = (id)=> (dispatch,getState) => {

    dispatch({
        type:CART_REMOVE_ITEM,
        payload: id
    });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress=(data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod=(data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data
    });

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}