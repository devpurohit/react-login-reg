import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAY8wVvvhpTAvNPDbVNcJPsdbDLR5Vle0A",
    authDomain: "moshi-react.firebaseapp.com",
    databaseURL: "https://moshi-react.firebaseio.com",
    projectId: "moshi-react",
    storageBucket: "moshi-react.appspot.com",
    messagingSenderId: "521183611794",
    appId: "1:521183611794:web:7110b2274bf9de50"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;