import React, { useState } from "react";
import firebase from "firebase";
const Login = ({history}) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let doSignIn = () => {
      debugger
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password).then((_result)=>{
          console.log(_result.user)
          history.push("/home")
      }, error => {
          console.log(error.message)
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };
  return (
    <div style={{ padding: 20 }}>
      <h4>Login</h4>
      <input
        value={username}
        onChange={e => setUserName(e.target.value)}
        style={{
          fontSize: 14,
          backgroundColor: "lightGrey",
          padding: 4,
          width: "94%"
        }}
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{
          fontSize: 14,
          backgroundColor: "lightGrey",
          padding: 4,
          width: "94%"
        }}
      />
      <button style={{ fontSize: 14, marginTop: 8 }} onClick={doSignIn}>
        SAVE
      </button>
      <button
        style={{ fontSize: 14, marginTop: 8 }}
        onClick={() => {
          setPassword("");
          setUserName("");
        }}
      >
        RESET
      </button>
    </div>
  );
};

export default Login;
