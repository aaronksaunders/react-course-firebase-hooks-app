import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect, withRouter } from "react-router-dom";
import { IonApp, IonPage, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
// import "./theme/variables.css";

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
      console.log(user && user.email);
    });
  };

  /**
   * called at startup to see if user is logged in or not
   */
  useEffect(() => {
    if (authCheckDone) return;
    doAuthCheck();
  });

  return authCheckDone ? (
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <Redirect from="/" to="/home" />
          <Route
            exact
            path="/login"
            render={loggedIn ? Home : withRouter(Login)}
          />
          <ProtectedRoute path="/home" component={Home} />
        </IonPage>
      </IonReactRouter>
    </IonApp>
  ) : null;
}

export default App;
