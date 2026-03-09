import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = process.env.FIRBASE_STORAGE_ENV
  firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
