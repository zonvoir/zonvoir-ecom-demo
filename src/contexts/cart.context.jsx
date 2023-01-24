import { createContext, useReducer } from 'react';

import {createAction} from '../utilities/reducer/reducer.utilities';

// HELPER FUNCTIONS
const addCartItemHelper = (cartItems, productToAdd) => {
    
    const existingCartItem = cartItems.find( 
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map( (cartItem) => 
            cartItem.id === productToAdd.id 
                ? { ...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1}];
}

const removeCartItemHelper = (cartItems, cartItemToRemove) => {

    // stores actual cart item in focus
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    );
    // remove item if already at qty 1
    if (existingCartItem.quantity === 1) {
        return cartItems.filter( item => item.id !== cartItemToRemove.id);
    }
    // decrement 1
    return cartItems.map( item => 
        item.id === cartItemToRemove.id 
        ? { ...item, quantity: item.quantity - 1}
        : item
    );
}

const clearCartItemHelper = (cartItems, cartItemToClear) => {
     return cartItems.filter( item => item.id !== cartItemToClear);
}



// === E X P O R T S
// ===
export const CartContext = createContext( {
    isCartOpen: false,
    // setIsOpen: () => {},
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});


// ===--    -   --=== REDUCER STUFF

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

// initial state:
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}


// reducer:
const cartReducer = (state, action) => {

    const {type, payload} = action;

    switch(type) {
        case 'SET_CART_ITEMS':  // ensure reducer is prepared to receive this value
            return {
                ...state,
                ...payload
            }
        case 'SET_IS_CART_OPEN':
            return {
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`Unhandled type ${type} in the userReducer`); // NOTE: -  cart should only be receiving actions that are accounted for
    }
}





// ===--    -   --===
export const CartProvider = ( {children} ) => {

    // REDUCER
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    // DESTRUCTURE STATE
    const {cartItems, isCartOpen, cartCount, cartTotal} = state;


    // LOCAL HELPERS
    const addItemToCart = (productToAdd) => {
        const newCartItems = (addCartItemHelper(cartItems, productToAdd));
        console.log("addItemToCart((newCartItems) =>: ", newCartItems);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = (removeCartItemHelper(cartItems, cartItemToRemove));
        console.log("removeItemFromCart((newCartItems) =>: ", newCartItems);
        updateCartItemsReducer(newCartItems);
    }
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = (clearCartItemHelper(cartItems, cartItemToClear));
        console.log("clearItemFromCart((newCartItems) =>: ", newCartItems);
        updateCartItemsReducer(newCartItems);
    }


    // === ACTION CREATORS:
    const updateCartItemsReducer = (newCartItems) => {
        console.log("updateCartItemsReducer((newCartItems) =>: ", newCartItems);

        const newCartCount = newCartItems.reduce( (total, cartItem) => 
            total + cartItem.quantity, 
            0
        );

        const newCartTotal = newCartItems.reduce( (total, cartItem) => 
            total + cartItem.quantity*cartItem.price, 
            0
        );

        dispatch(
            createAction( CART_ACTION_TYPES.SET_CART_ITEMS, 
                {
                    cartItems: newCartItems, 
                    cartCount: newCartCount, 
                    cartTotal: newCartTotal,
                }
            )
        );
    };

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
        );
    }


    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
            addItemToCart, 
            removeItemFromCart, 
            clearItemFromCart,
        cartCount,
        cartTotal,
    };


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}