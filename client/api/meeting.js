/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */

import axios from 'axios';
import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';
// const endpoint = 'http://localhost:5000/meetaap-55e58/us-central1/app';

const endpoint = 'https://us-central1-meetaap-55e58.cloudfunctions.net/app';

export const instantMeeting = async (data) => {
  return axios.post(`${endpoint}/meeting/instant`, data);
};

export const scheduleMeeting = async (data) => {
  return axios.post(`${endpoint}/meeting/schedule`, data);
};

export const getMeetingEvents = (start, end, user) => {
  return new Promise((resolve, reject) => {
    const startTme = firebase.firestore.Timestamp.fromDate(start);
    const endDate = firebase.firestore.Timestamp.fromDate(end);
    const userRef = firebase.firestore().collection('users').doc(user);
    console.log(start, end, user);
    firebase
      .firestore()
      .collection('meeting')
      .where('createdBy', '==', userRef)
      .where('scheduledAt', '>=', startTme)
      .where('scheduledAt', '<=', endDate)
      .where('type', '==', 'scheduled')
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((i) => {
          return {
            id: i.id,
            title: i.title,
            description: i.description,
            start: i.data().scheduledAt.toDate(),
            textColor: '#1890FF',
            end: i.data()?.endAt?.toDate(),
            ...i.data(),
          };
        });
        console.log(data);
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const sendOtp = (mobile, meeting, password = '') => {
  return axios.post(`${endpoint}/misc/send-otp`, { mobile: mobile, meeting, password: password });
};

export const verifyOtp = (otp, meeting, mobile) => {
  return axios.post(`${endpoint}/misc/verify-otp`, { otp, meeting, mobile });
};

export const joinMeeting = (data) => {
  return axios.post(`${endpoint}/meeting/join`, data);
};

export const getMeetingDetails = (id) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('meeting')
      .doc(id)
      .get()
      .then((snapshot) => {
        console.log(snapshot, snapshot.data());
        let data = snapshot.data();
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
