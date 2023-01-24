
import { createContext, useEffect, useReducer } from 'react';

import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utilities/firebase.utility';

import {createAction} from '../utilities/reducer/reducer.utilities';


// CONTEXT
export const UserContext = createContext({
    // DEFAULT STATE
    currentUser: null,  //NOTE: an empty object still evaluates to true, hence 'null'
    setCurrentUser: () => null, // should be called resetCurrentUser?
});



// ACTION TYPES
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

// REDUCER
const userReducer = (state, action) => {
    console.log("[]\\/[]ACRUS: one of your dispatch() functions has been dispatched");

    console.log("action: ", action);
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,       // precautionary
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in the userReducer`);
    }
}

// INIIAL "STATE"
const INITIAL_STATE = {
    currentUser: null,
}



// PROVIDER
export const UserProvider = ( {children} ) => {

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    // destructure currentUser from the state
    const {currentUser} = state; console.log("currentUser: ", currentUser);
    // define setCurrentUser
    const setCurrentUser = user => {
        dispatch(
            createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
        );
    }
    // store both in an object called 'userValue,' which will be set as a value prop for the <UserContext.Provider value={} later
    const userValue = {currentUser, setCurrentUser};

    useEffect( () => {
        const unsubscribe = onAuthStateChangedListener( (user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user); console.log(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
}








//NOW: go to index.js and wrap <App /> in the UserContext component

/*
A reducer is a function that returns an object that has the shape of the data that we want to store (anything related to the user), where the object is the state (one might want to reference the state values in order to derive the next state values)
- the reason it returns a new object is because this is how react works, it rerenders upon change, if the object is simply changed inside, then the virtual dom recognizes the object as old, even though content is new, and does not trigger a re-render.
- instead of storing values in state, we use reducer
- whenever dispatch gets called and a new state object is returned, then we also will rerun this functional component (just like useState... kinda)
- reducers only store readable values (which means, initial state is everything in the CartContext that are readable values, but not the setter or helper functions)

- RULE OF THUMB: a reducer should not handle any business logic

- RULE OF THUMB: 
    - QUESTION: when to use a reducer?
    - ANSWER: when a single change must be refleted in more than one way


- FIRST: think about the shape of the final output

- dispatch() function - a function that is passed in the parameters for an action (action-type, and a payload of arguments)
    which results in an "action" that is then passed to the reducer, which will find the appropriate case, perform operation, and return a new state-object

- payload() contains the shape of what we want



const userReducer = (state, action) => {

    return {
        currentUser: null, //or maybe a googleAuthObj  returned from firebase
    }
}



CHALLENGE
Figure out how to create a new function that can encapsulate all of this so that you can dispatch a correct action,
that takes newCartItems,
that will then update according to what we've written in the useEffects,
then respectively update the actual reducer-value

const updateCartItemsReducer = (newCartItems) => {

}
*/