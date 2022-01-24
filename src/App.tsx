import React from 'react';
import './custom.css';
import './App.css';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/analytics';

import { FirebaseAuthProvider } from '@react-firebase/auth';
import MainRouter from './Router';

const firebaseConfig = {
  apiKey: '-',
  appId: '-',
  authDomain: '-',
  databaseURL: '',
  measurementId: '-',
  messagingSenderId: '-',
  projectId: '-',
  storageBucket: '-',
};

export default function App() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <I18nextProvider i18n={i18n}>
        <MainRouter />
      </I18nextProvider>
    </FirebaseAuthProvider>
  );
}
