import React, { useState } from "react";
import firebase from "firebase";

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel
} from "@ionic/react";

const Login = ({ history }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let doSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(
        _result => {
          console.log(_result.user);
          history.push("/home");
        },
        error => {
          console.log(error.message);
        }
      )
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email Address</IonLabel>
          <IonInput
            type="email"
            value={username}
            onInput={e => setUserName(e.target.value)}
            style={{
              width: "94%"
            }}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onInput={e => setPassword(e.target.value)}
            style={{
              width: "94%"
            }}
          />
        </IonItem>
        <div
          style={{ justifyContent: "center", display: "flex", paddingTop: 8 }}
        >
          <IonButton onClick={doSignIn}>LOGIN</IonButton>
          <IonButton
            onClick={() => {
              setPassword("");
              setUserName("");
            }}
          >
            RESET
          </IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default Login;
