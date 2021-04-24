/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
// import './whydidyourender'


import React from 'react';
import ReactDOM from 'react-dom';
// alert
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase'
import './styles/app.css'


const options = {  
    position: positions.TOP_CENTER,
    timeout: 200,
    transition: transitions.FADE
  }


ReactDOM.render(
    <FirebaseContext.Provider value={{firebase, FieldValue}}>
        <AlertProvider template={AlertTemplate}>
            <App />
        </AlertProvider>
    </FirebaseContext.Provider>
, document.getElementById('root'))
