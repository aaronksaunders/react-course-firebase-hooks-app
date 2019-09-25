## react-course-firebase-hooks-app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Sample app integrating firebase with a react application using react hooks api and [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks) - A set of reusable [react hooks](https://reactjs.org/docs/hooks-intro.html) for [Firebase](https://firebase.google.com/docs/web/setup?authuser=0).

<img src="Screen Shot 2019-09-25 at 1.59.32 AM.png" width=600 />


## Getting A Collecting of Things

## Getting a Specific Thing

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

