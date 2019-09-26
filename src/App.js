import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect, withRouter } from "react-router-dom";
import "./App.css";

// importing firebase
import firebase from "firebase/app";

// import the components we are rendering on page
import Home from "./Home";
import Login from "./Login";

//
// initialize firebase using properties on firebase console
// https://firebase.google.com/docs/web/setup?authuser=0
//
var firebaseConfig = {};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/**
 * checks to make sure there is a user otherwise
 * redirect to the login route
 *
 * @param {*} param0
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      {
        return firebase.auth().currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
    }}
  />
);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authCheckDone, setAuthCheckDone] = useState(false);

  /**
   * check firebase to see if a user has logged in or
   * not and set appropriate state
   */
  const doAuthCheck = () => {
    firebase.auth().onAuthStateChanged(user => {
      user != null ? setLoggedIn(true) : setLoggedIn(false);
      setAuthCheckDone(true);
      console.log(user.email);
    });
  };

  /**
   * logout of firebase
   */
  const doLogout = () => {
    firebase.auth().signOut();
  };

  /**
   * called at startup to see if user is logged in or not
   */
  useEffect(() => {
    if (authCheckDone) return;
    doAuthCheck();
  });

  return authCheckDone ? (
    <>
      {/* if logged in show logout button */
      loggedIn && <button onClick={() => doLogout()}>LOGOUT</button>}
      <BrowserRouter>
        <Redirect from="/" to="/home" />
        <Route
          exact
          path="/login"
          render={loggedIn ? Home : withRouter(Login)}
        />
        <ProtectedRoute path="/home" component={Home} />
      </BrowserRouter>
    </>
  ) : null;
}

export default App;
