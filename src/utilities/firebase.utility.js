
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries
import { 
    createUserWithEmailAndPassword,
    getAuth, 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

// NOTE: Database-firestore is another service
import {
    getFirestore, //firestore db class to instantiate
    doc,        // get a document instance
    getDoc,     // access document's data
    setDoc,     // set document's data
    collection, // similar to getting a userDocRef, 
    writeBatch, // use this to run multiple calls for a single process
    query,
    getDocs,
} from 'firebase/firestore';





// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};





// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


// Initialize a provider instance using the GoogleAuthProvider class
export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",   //force user to select an account with every interaction
}) // "takes some kind of configuration object and tell different ways we want the google auth googleProvider to behave"





export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider); //NOTE: a redirect to a completely separate page is permission for current page to unmount, as it does not know when/if user will return.  For this reason, use getRedirectResult instead

export const signInWithGoogleEmailPassword = () => signInWithEmailAndPassword(auth, googleProvider);





// create the db (instantiate the firestore) in order to use to access the database
export const db = getFirestore(firebaseApp);
// export const db = getFirestore();


// new function to handle putting data from local up to firestore (probably a temporary function), 
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    const collectionRef = collection(db, collectionKey);

    //store each of these objects inside of this new collectionRef as a new document (since we are writing multiple different documents into a collection, therefore, we need to think about the concept of transactions)
    //create a batch to add all objects to the collection in one successfull transaction
    const batch = writeBatch(db);

    // create a bunch of set-events
    objectsToAdd.forEach( object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("done")
}

/*PATTERN used to ensure code behaves when Firebase updates*/
// helper function to isolate areas that might change from other areas (in this particular case, from third party libraries)
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    
    //reduce over this to create the data structure
    const categoryMap = querySnapshot.docs.reduce( (accumulator, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {});

    return categoryMap;
};






//
export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {},
) => {
    
    if (!userAuth) return;

    //note: user.uid is a unique object identifier, check if already pulled the collection this time
    const userRefDoc = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userRefDoc);  //read the data

    // if user doesn't already exist, then create a new user
    if (!userSnapshot.exists()) {
        const {displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc( userRefDoc, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch(error) {
            console.log("There was an error creating the user: ", error.message)
        }
    }

    return userRefDoc;
};





// create an interface-layer with a helper function
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}




// USER CONTEXT STUFF
// USER SIGNS OUT OF THEIR ACCOUNT ACCESS
export const signOutUser = async () => {
    await signOut(auth);
}


// HELPER FUNCTION: observer listener for better useContext
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);