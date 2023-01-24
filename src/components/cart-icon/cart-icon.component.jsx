import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';


// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { 
    ShoppingIcon, 
    CartIconContainer, 
    ItemCount 
} from './cart-icon.styles.jsx';





const CartIcon = () => {

    //establish contaxt for component
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}


export default CartIcon;