import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonButtons
} from "@ionic/react";
import "./App.css";

// import the components we are rendering on page
import AddThing from "./AddThing";
import ThingList from "./ThingList";
import firebase from "firebase";

function Home() {
  // track if the user has selected an item to edit
  const [current, setCurrent] = useState(null);

  /**
   * logout of firebase
   */
  const doLogout = () => {
    firebase.auth().signOut();
  };

  /**
   * set the state variable current to the id of the item selected
   * for edit, this will cause the AddThing compont to render, ready to
   * edit the object
   */

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => doLogout()}>LOGOUT</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* for for editing or creating */}
        <IonCard>
          <IonCardHeader>
            <h3>Add A Thing</h3>
          </IonCardHeader>
          <IonCardContent>
            <AddThing initialValue={current} clear={() => setCurrent(null)} />
          </IonCardContent>
        </IonCard>
        {/* Renders the list on the page */}
        <div className="ion-padding">
          <ThingList doEdit={setCurrent} />
        </div>
      </IonContent>
    </>
  );
}

export default Home;
