import { useState } from 'react';

import {
    // createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from "../../utilities/firebase.utility.js";

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';


import { SignUpContainer } from './sign-in-form.styles.jsx';


const defaultFormFields = {
    email: '',
    password: '',
};


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password } = formFields;

    


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }
        catch(err) {
            switch (err.code) {
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password for this account.')
                    break;
                default:
                    console.log(err);
            }
        }
    }
    // console.log("hit - sign-IN component mounted.  NOTE: all code above this point was run again.")

    

    

    return (
        <SignUpContainer>

            <h2>Already have an account?</h2>
            <span>Sign in with Email and Password</span>

            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email" 
                    type="email" 
                    onChange={handleChange} 
                    name="email"
                    value={email}
                    required
                />

                <FormInput
                    label="Password" 
                    type="password" 
                    onChange={handleChange} 
                    name="password"
                    value={password}
                    required
                />

                <div className='buttons-container'>
                    <Button type="submit">Sign-in</Button>
                    <Button 
                        type="button" 
                        onClick={signInWithGoogle}
                        buttonType={BUTTON_TYPE_CLASSES.google}
                    >
                        Google sign-in
                    </Button>
                </div>
            </form>
        </SignUpContainer>
    )
}

export default SignInForm;