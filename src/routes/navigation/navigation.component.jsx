// MAIN FUNCTIONALITY
import { Fragment, useContext } from 'react';

import { Outlet } from 'react-router-dom';

// CUSTOM HOOK FUNCTIONALITY
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

// FIREBASE UTILITIES
import { signOutUser } from '../../utilities/firebase.utility.js';

// COMPONENTS
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

// DETAIL FILES
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

// STYLES
import { 
  NavigationContainer,
  LogoLinkContainer,
  NavLinks,
  NavLink
} from "./navigation.styles";




// top level component
const Navigation = () => {

  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);


  return (
    <Fragment>
      <NavigationContainer>
        <LogoLinkContainer to='/'>
            <CrwnLogo className="logo" />
        </LogoLinkContainer>
        <NavLinks>

            <NavLink to="/shop">
                SHOP
            </NavLink>

            <CartIcon />

            <NavLink to="/contact">
                CONTACT
            </NavLink>
            
            <NavLink to="/projects">
                Projects
            </NavLink>
            
            {/*sign-in or sign-out link*/}
            {
              currentUser ? (
                <NavLink as="span" onClick={signOutUser}>Sign Out</NavLink>
              ) :(
                <NavLink to="/auth">Sign In</NavLink>
              )
            }
            
        </NavLinks>

        {
          isCartOpen && <CartDropdown />
        }

      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;