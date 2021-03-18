/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
// import {seedDatabase} from '../seed' 
// here i want to import the seed file
const config ={
    apiKey: "AIzaSyABE_lm_oD2B1fDFBzL8S8IR8GNSoGsPqA",
    authDomain: "dinhstagram.firebaseapp.com",
    projectId: "dinhstagram",
    storageBucket: "dinhstagram.appspot.com",
    messagingSenderId: "702361511388",
    appId: "1:702361511388:web:054cb5db898f0af49fdb19"
};

const firebase = Firebase.initializeApp(config)
// console.log(firebase);
const {FieldValue} = Firebase.firestore;

// here is where call file seed.js only once
// seed function  seedDatabase(fb)

// seedDatabase(firebase);

export { firebase, FieldValue };