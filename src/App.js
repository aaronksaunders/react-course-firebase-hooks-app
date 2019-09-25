import React, { useState } from "react";
import "./App.css";

// importing firebase
import firebase from "firebase/app";

// import the components we are rendering on page
import AddThing from "./AddThing";
import ThingList from "./ThingList";

// 
// initialize firebase using properties on firebase console
// https://firebase.google.com/docs/web/setup?authuser=0
//
var firebaseConfig = {
  apiKey: "AIzaSyAlTTdjRdmEt_UCHgqY7W4CiRNTht-Mv0M",
  authDomain: "vueclass-106b7.firebaseapp.com",
  databaseURL: "https://vueclass-106b7.firebaseio.com",
  projectId: "vueclass-106b7",
  storageBucket: "vueclass-106b7.appspot.com",
  messagingSenderId: "800099862302",
  appId: "1:800099862302:web:b184f740598a80c9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  // track if the user has selected an item to edit
  const [current, setCurrent] = useState(null);

  /**
   * set the state variable current to the id of the item selected
   * for edit, this will cause the AddThing compont to render, ready to
   * edit the object
   */

  return (
    <div className="App">
      {/* for for editing or creating */}
      <AddThing initialValue={current} clear={() => setCurrent(null)} />
      {/* Renders the list on the page */}
      <ThingList doEdit={setCurrent} />
    </div>
  );
}

export default App;
