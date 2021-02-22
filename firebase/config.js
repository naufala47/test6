import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBq8qMQI0xEIiHNy-dtoVFwlQmb3r0tq8k",
    authDomain: "nativeahmad.firebaseapp.com",
    databaseURL: "https://nativeahmad-default-rtdb.firebaseio.com",
    projectId: "nativeahmad",
    storageBucket: "nativeahmad.appspot.com",
    messagingSenderId: "380923995430",
    appId: "1:380923995430:web:3ed6abc872e9f757f14de7"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };