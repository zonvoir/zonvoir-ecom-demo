
import { useContext } from 'react';
import {CartContext } from '../../contexts/cart.context';

import { CheckoutItemContainer } from './checkout-item.styles.jsx'


const CheckoutItem = ( {cartItem} ) => {

    const { clearItemFromCart, addItemToCart, removeItemFromCart  } = useContext(CartContext);

    const {name, imageUrl, quantity, price, id} = cartItem;

    const clearCartItemHandler = () => {
        clearItemFromCart(id)
    }
    const addCartItemHandler = () => {
        addItemToCart(cartItem);
    }
    const removeCartItemHandler = () => {
        removeItemFromCart(cartItem);
    }
    

    return (
        <CheckoutItemContainer>
            <div className="image-container">
                <img src={`${imageUrl}`} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div 
                    className="arrow" 
                    onClick={removeCartItemHandler}
                >
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div 
                    className="arrow" 
                    onClick={addCartItemHandler}
                >
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div onClick={clearCartItemHandler} className="remove-button">
                &#10005;
            </div>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;