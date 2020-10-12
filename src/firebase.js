import * as firebase from "firebase";



const firebaseConfig = {
    apiKey: "AIzaSyCod765GTO78-RN1NLHPiUfhbSH2bz8E7M",
    authDomain: "fir-react-716cd.firebaseapp.com",
    databaseURL: "https://fir-react-716cd.firebaseio.com",
    projectId: "fir-react-716cd",
    storageBucket: "fir-react-716cd.appspot.com",
    messagingSenderId: "694717666646",
    appId: "1:694717666646:web:02d0c94b121986320172f7"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;