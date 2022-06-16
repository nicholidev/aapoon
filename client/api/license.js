/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import axios from 'axios';
import firebase from 'firebase/compat/app';
import addDays from 'date-fns/addDays';
import 'firebase/compat/firestore';
//const endpoint = 'http://localhost:5000/meetaap-55e58/us-central1/app';

const endpoint = process.env.NEXT_PUBLIC_FUNCTION_URL;

export const assignLicense = async (userid, data) => {
  return new Promise(async (resolve, reject) => {
    let existingDocRef = await firebase
      .firestore()
      .collection('licenses')
      .where('email', '==', data.email.toLowerCase())
      .where('isActivated', '==', true)
      .get();
    if (existingDocRef.docs.length) {
      return reject('User already have a license');
    }

    firebase
      .firestore()
      .collection('licenses')
      .add({
        ...data,
        email: data.email.toLowerCase(),
        owner: userid,
        origin: window.location.origin,
        assignedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        expiredAt: firebase.firestore.Timestamp.fromDate(addDays(new Date(), 3)),
      })
      .then((res) => {
        res.onSnapshot((snap) => {
          return resolve(snap.data());
        });
      })
      .catch((err) => reject('Unable to assign license'));
  });
};
