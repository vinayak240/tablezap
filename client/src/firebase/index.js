import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCzg0riZ1suwzH4C5lKm5HqCCQAS1twN78",
    authDomain: "a-fireb-1.firebaseapp.com",
    databaseURL: "https://a-fireb-1.firebaseio.com",
    projectId: "a-fireb-1",
    storageBucket: "a-fireb-1.appspot.com",
    messagingSenderId: "772036377409",
    appId: "1:772036377409:web:7112fa85b64c8344e8ffc0",
    measurementId: "G-L9TQEHP229"
  };

  firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };