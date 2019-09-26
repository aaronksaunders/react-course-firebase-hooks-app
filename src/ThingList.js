import React, { useState } from "react";
import "./App.css";

import ThingListItem from "./ThingListItem";

import firebase from "firebase/app";
// https://github.com/CSFrequency/react-firebase-hooks
import { useCollection } from "react-firebase-hooks/firestore";
import { IonList } from "@ionic/react";

export default function ThingList({ doEdit }) {
  // this is from firebase-hooks, it allows us to query all of the itemss
  // from the `things` collection in the database in desc order based on
  // the creation data
  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection("things")
      .orderBy("createdOn", "desc"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const closeSlidingItems = () => {
    var list = document.getElementById("list");
    list.closeSlidingItems();
  };

  /**
   * deletes item from firebase database using the id
   * of teh object
   *
   * @param {*} id
   */
  const doDelete = id => {
    firebase
      .firestore()
      .collection("things")
      .doc(id)
      .delete();
  };

  return (
    <>
      <h3>Things Collection</h3>
      <IonList id="list">
        {value &&
          value.docs.map(doc => {
            return (
              !loading && (
                <ThingListItem
                  doc={doc}
                  doEdit={i => {
                    closeSlidingItems();
                    doEdit(i);
                  }}
                  doDelete={i => {
                    closeSlidingItems();
                    doDelete(i);
                  }}
                  key={doc.id}
                />
              )
            );
          })}
      </IonList>
    </>
  );
}
