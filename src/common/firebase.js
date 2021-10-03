import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";

if(!firebase.apps.length){
    var firebaseConfig = {
        apiKey: "AIzaSyCpQkwThXLPSacWQVLAdcPYYBfkJetV1A8",
        authDomain: "call-me-cabs-fadaf.firebaseapp.com",
        databaseURL: "https://call-me-cabs-fadaf.firebaseio.com",
        projectId: "call-me-cabs-fadaf",
        storageBucket: "call-me-cabs-fadaf.appspot.com",
        messagingSenderId: "215881098039",
        appId: "1:215881098039:android:758825256f731027cff0b2",
    };
    firebase.initializeApp(firebaseConfig);
  }else{
    firebase.app();
  }

export default firebase;