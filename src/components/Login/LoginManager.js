import * as firebase from "firebase/app"
import "firebase/auth";
import firebaseConfig from '../../firebase-config';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
}
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signInuser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signInuser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}
export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signOutuser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signOutuser;
        })
}
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name)
            return newUserInfo;
        })
        .catch(error => {
            // Handle Errors here.
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
            // ..
        });
}
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
           return newUserInfo;
        })
        .catch(error => {
            // Handle Errors here.
            const newUserInfo = {}
            newUserInfo.error = error.message;
            newUserInfo.success = false
            return newUserInfo;
            // ...
        });
}
 const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('user name updated');
    }).catch(function (error) {
        console.log(error);
    });
}