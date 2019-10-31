## react-course-firebase-hooks-app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

> Make sure you check the branches, there are different feature implemented in the branches
> - Master - implements react firebase hooks for reading and writing data to firebase
> - With Authentication - implements a Firebase Login Flow
> - Capacitor Ionic - implements the solution using ionic framework components and capacitor for mobile deployment
> - Capacitor - implements the solution using capacitor for mobile deployment

Sample app integrating firebase with a react application using react hooks api and [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks) - A set of reusable [react hooks](https://reactjs.org/docs/hooks-intro.html) for [Firebase](https://firebase.google.com/docs/web/setup?authuser=0).

<img src="Screen Shot 2019-09-25 at 1.59.32 AM.png" width=600 />


## Getting A Collecting of Things

This is from firebase-hooks, it allows us to query all of the item from the `things` collection in the database in descending order based on the creation data. the `value` will containg the results of the query that we will loop through to render the list items
```javascript
  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection("things")
      .orderBy("createdOn", "desc"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
```
## Getting a Specific Thing

We use the firebase-hooks to get a specific object using the id of the object we want to retrieve
```javascript
  // get a document if there is an initial value
  const [value, loading, error] = useDocument(
    firebase.firestore().doc("things/" + objectId),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
```

## Adding Or Updating a Specific Thing

if editing then we use the firebase-hooks to get the specific object using the
`initialValue` property that is passed to the component
```javascript
  // get a document if there is an initial value
  const [value, loading, error] = useDocument(
    firebase.firestore().doc("things/" + initialValue),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
```
When saving the thing, determine if it is a new object or an existing object by checking to see if there was an `initialValue` provided as a property. If there was, then we have an object id so we need to update the object and not create a new object
```javascript
  /**
   * on save determine if it is a new object or an existing object
   * by check to see if there was an initial value provided
   */
  const onSave = async () => {
    let collectionRef = firebase.firestore().collection("things");

    if (initialValue) {
      await collectionRef
        .doc(initialValue)
        .set({ name: thing, updatedOn: new Date().getTime() }, { merge: true });
      setThing("");
      clear();
    } else {
      await collectionRef
        .doc(initialValue)
        .add({ name: thing, createdOn: new Date().getTime() });
      setThing("");
      clear();
    }
  };
  ```

## Deleting A Specific Thing
There is no firebase-hook to delete an object, we just used the firebase javascript api to remove the object
```javascript
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
  ```
