import React, { useState } from "react";
import "./App.css";


// import the components we are rendering on page
import AddThing from "./AddThing";
import ThingList from "./ThingList";


function Home() {
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

export default Home;
