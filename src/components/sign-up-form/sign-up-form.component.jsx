// MAIN FUNCTIONALITY
import { useState } from 'react';


// COMPONENTS, UTILITIES, OTHER
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utilities/firebase.utility.js";

import FormInput from '../form-input/form-input.component';

import Button from '../button/button.component';


// STYLES
import './sign-up-form.styles.scss';


// CONSTANTS, OBJECTS
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};


// FEATURE COMPONENT
const SignUpForm = () => {

    
    const [formFields, setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, confirmPassword} = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;

            // console.log("formFields before: ", formFields);
            console.log("formFields before: ", formFields);
        setFormFields({...formFields, [name]: value});
            // console.log("formFields after: ", formFields);
            console.log("formFields after: ", formFields);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        //create a user document from what createAuthUserWithEmailAndPassword returns
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password,
                // where email and password are destructured out of formFields
            );
            
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();

        }
        catch(err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('An account already exists using this email address.  An email alert has been sent to this email address to alert the owner of this registration attempt.');
            }
            else {
                console.log(`User creation created the following error: ${err}`);
            }
        }
    }


    // console.log("hit - sign-up component mounted.  NOTE: all code above this point was run again.");

    

    

    return (
        <div className="sign-up-container">

            <h2>Don't have an account?</h2>
            <span>Sign up with Email and Password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name" 
                    type="text" 
                    onChange={handleChange} 
                    name="displayName"
                    value={displayName}
                    required
                />

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

                <FormInput
                    label="Confirm Password" 
                    type="password" 
                    onChange={handleChange} 
                    name="confirmPassword"
                    value={confirmPassword}
                    required
                />

                <Button 
                    type="submit"
                >
                    Sign-up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm;