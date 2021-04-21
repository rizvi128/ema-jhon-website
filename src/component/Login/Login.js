import React, { useContext } from 'react';

import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import firebaseConfig from "./FirebaseConfig";
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


firebase.initializeApp(firebaseConfig);


function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

 const [loggedInUser,setLoggedInUser] =useContext(userContext);
 const history = useHistory()
 const location = useLocation();
 const { from } = location.state || { from: { pathname: "/" } };


  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignClick = () => {

    firebase.auth().signInWithPopup(provider)
      .then(result => {


        const { displayName, photoURL, email } = result.user;
        console.log(result.user)
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL

        }
        setUser(signInUser)

      })

      .catch((error) => {

        console.log(error)
        console.log(error.message)

      });
  }
  const handleClickOut = () => {


    firebase.auth().signOut()
      .then(() => {
        const singndOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }
        setUser(singndOutUser)

      }).catch((error) => {
        console.log(error)

      });

  }


  const handleBlur = (event) => {
    let isFormValid = true;
    if (event.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value)


    }
    if (event.target.name === 'password') {
      const passwordLength = event.target.value.length > 6;
      const passwordValid = /\d{1}/.test(event.target.value);
      isFormValid = passwordValid && passwordLength
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)

    }

  }

  const handleSubmit = (event) => {

    if (newUser && user.email && user.password) {

      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          updateUserName(user.name)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });

    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);

          console.log('sign in user info', res.user)


        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    event.preventDefault();
  }


  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function () {
      console.log('user name updating successfully')
    }).catch(function (error) {
      console.log(error)
    });
  }





  const handleFbSignIn = () => {
  }

  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={handleClickOut}>Sign out</button> :
          <button onClick={handleSignClick}>Sign in</button>
      }
      <br />
      {
        <button onClick={handleFbSignIn}>
          sign in using Facebook
        </button>
      }
      {
        user.isSignedIn &&
        <div>
          <p>Welcome, {user.name}</p>
          <img src={user.photo} alt="" />
          <h1>Email: {user.email}</h1>

        </div>
      }



      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User sign in</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleBlur} placeholder="Your Name" name="name" required />

        }<br />
        <input type="text" onBlur={handleBlur} placeholder="hello brother" name="email" required />

        <br />
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="hey don't use your bay name" required />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "sign in"} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>user {newUser ? "Created" : "logged in"} Successfully!</p>}


    </div>
  );
}

export default Login;
