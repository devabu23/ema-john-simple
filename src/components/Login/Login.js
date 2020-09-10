import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: '',
        success: '',
    })

    initializeLoginFramework()

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            setUser(res);
            setLoggedInUser(res)
            history.replace(from)
        })
    }
    const signOut = () => {
        handleSignOut()
        .then(res => {
            setUser(res);
            setLoggedInUser(res)
        })
    }
    
    const handleBlur = (e) => {
        // console.log(e.target.name, e.target.value);
        let isEmailValid = true;
        if (e.target.name === 'email') {
            isEmailValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(e.target.value)
            isEmailValid = isPasswordValid && passwordNumber;
        }
        if (isEmailValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser)
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
           createUserWithEmailAndPassword(user.name, user.email, user.password)
           .then(res => {
            setUser(res);
            setLoggedInUser(res)
            history.replace(from)
           })
        }
        if (!newUser && user.email && user.password) {
           signInWithEmailAndPassword(user.email, user.password)
           .then(res => {
            setUser(res);
            setLoggedInUser(res)
            history.replace(from)
           })
        }

        e.preventDefault()
    }
    


    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignIn ? <button onClick={signOut}>SignOut</button> :
                    <button onClick={googleSignIn}>Sign In</button>
            }

            {
                user.isSignIn && <div>

                    <h2>Name :{user.name}</h2>
                    <h3>Email : {user.email}</h3>
                    <img src={user.photo} alt="" />
                </div>
            }
            <h1>Login</h1>
            <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
            <label htmlFor="newUser">New User SignUp</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" placeholder="your name" onBlur={handleBlur} name="name" />}
                <br />
                <input onBlur={handleBlur} type="text" placeholder="Your Email" name="email" />
                <br />
                <input onBlur={handleBlur} type="password" name="password" placeholder="Your Password" />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <h1 style={{ color: 'red' }}>{user.error}</h1>
            {user.success && <h1 style={{ color: 'green' }}>user {newUser ? 'create' : 'logged in'}</h1>}
        </div>
    );
}

export default Login;
