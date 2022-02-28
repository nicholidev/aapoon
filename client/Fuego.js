/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import react from 'react';
import firebase from 'firebase/compat/app';

export class Fuego {
  constructor(config) {
    this.db = !firebase.apps.length ? firebase.initializeApp(config).firestore() : firebase.app().firestore();
    this.auth = firebase.auth;
    this.functions = firebase.functions;
    this.storage = firebase.storage;
  }
}
