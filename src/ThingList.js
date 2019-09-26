import React, { useState } from "react";
import "./App.css";

import ThingListItem from "./ThingListItem";

import firebase from "firebase/app";
// https://github.com/CSFrequency/react-firebase-hooks
import { useCollection } from "react-firebase-hooks/firestore";

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
      {error && <strong>Error: {error}</strong>}
      <h3>Things Collection{loading && <span> Loading...</span>}</h3>
      {value &&
        value.docs.map(doc => {
          return (
            !loading && (
              <ThingListItem
                doc={doc}
                doEdit={doEdit}
                doDelete={doDelete}
                key={doc.id}
              />
            )
          );
        })}
    </>
  );
}
