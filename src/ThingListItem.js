import React  from "react";
import "./App.css";
export default function ThingListItem({ doEdit, doDelete, doc }) {
    let data = doc.data();
    return (
      <div className="thing-wrapper">
        <div className="thing-title">{data.name}</div>
        <div className="thing-sub-title">{new Date(data.createdOn) + ""}</div>
        <div className="thing-id">{doc.id}</div>
        <p>
          <button onClick={() => doEdit(doc.id)}>EDIT</button>
          <button onClick={() => doDelete(doc.id)}>DELETE</button>
        </p>
      </div>
    );
  }