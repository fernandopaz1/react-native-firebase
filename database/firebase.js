import firebase from "firebase";

import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1qqDGPmcUI0EcDHnPvOKe67Poctcio_U",
    authDomain: "react-native-firebase-752c7.firebaseapp.com",
    projectId: "react-native-firebase-752c7",
    storageBucket: "react-native-firebase-752c7.appspot.com",
    messagingSenderId: "278127688339",
    appId: "1:278127688339:web:b452c7cbe6cb7421a1eb66",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db,
};
