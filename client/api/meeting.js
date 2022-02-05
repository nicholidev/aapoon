/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import axios from 'axios';
import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';
//const endpoint = 'http://localhost:5000/meetaap-55e58/us-central1/app';

const endpoint = 'https://us-central1-meetaap-55e58.cloudfunctions.net/app';

export const instantMeeting = async (data) => {
  return axios.post(`${endpoint}/meeting/instant`, data);
};

export const scheduleMeeting = async (data) => {
  return axios.post(`${endpoint}/meeting/schedule`, data);
};

export const getMeetingEvents = (start, end, user) => {
  return new Promise((resolve, reject) => {
    let totalMeeting = [];
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
      .where('reccurring', '==', false)
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((i) => {
          return i.data().reccurring
            ? {
                groupId: i.id,
                id: i.id,

                startTime: `${i.data().scheduledAt.toDate().getHours()}:${i
                  .data()
                  .scheduledAt.toDate()
                  .getMinutes()}:${i.data().scheduledAt.toDate().getSeconds()}`,
                endTime: `${i.data().endAt.toDate().getHours()}:${i.data().endAt.toDate().getMinutes()}:${i
                  .data()
                  .endAt.toDate()
                  .getSeconds()}`,
                startRecur: i.data().scheduledAt.toDate(),
                endRecur: i.data().reccuringEndDate.toDate(),

                backgroundColor: '#FFE9E9',
                color: '#FFE9E9',
                textColor: '#000',

                end: i.data()?.endAt?.toDate(),
                ...i.data(),
                endAt: undefined,
                startAt: undefined,
              }
            : {
                id: i.id,
                title: i.title,
                description: i.description,
                start: i.data().scheduledAt.toDate(),
                backgroundColor: i.data().scheduledAt.toDate() < new Date() ? '#D8D8E2' : '#E9FFEE',
                color: i.data().scheduledAt.toDate() < new Date() ? '#D8D8E2' : '#E9FFEE',
                textColor: '#000',
                end: i.data()?.endAt?.toDate(),
                ...i.data(),
              };
        });

        totalMeeting = [...totalMeeting, ...data];
        firebase
          .firestore()
          .collection('meeting')
          .where('createdBy', '==', userRef)
          .where('reccuringEndDate', '>=', startTme)
          .where('type', '==', 'scheduled')
          .where('reccurring', '==', true)
          .get()
          .then((snapshot) => {
            let data2 = snapshot.docs.map((i) => {
              return i.data().reccurring
                ? {
                    groupId: i.id,
                    id: i.id,

                    startTime: `${i.data().scheduledAt.toDate().getHours()}:${i
                      .data()
                      .scheduledAt.toDate()
                      .getMinutes()}:${i.data().scheduledAt.toDate().getSeconds()}`,
                    endTime: `${i.data().endAt.toDate().getHours()}:${i.data().endAt.toDate().getMinutes()}:${i
                      .data()
                      .endAt.toDate()
                      .getSeconds()}`,
                    startRecur: i.data().scheduledAt.toDate(),
                    endRecur: i.data().reccuringEndDate.toDate(),

                    backgroundColor: '#FFE9E9',
                    color: '#FFE9E9',
                    textColor: '#000',

                    end: i.data()?.endAt?.toDate(),
                    ...i.data(),
                    endAt: undefined,
                    startAt: undefined,
                  }
                : {
                    id: i.id,
                    title: i.title,
                    description: i.description,
                    start: i.data().scheduledAt.toDate(),
                    backgroundColor: i.data().scheduledAt.toDate() < new Date() ? '#D8D8E2' : '#E9FFEE',
                    color: i.data().scheduledAt.toDate() < new Date() ? '#D8D8E2' : '#E9FFEE',
                    textColor: '#000',
                    end: i.data()?.endAt?.toDate(),
                    ...i.data(),
                  };
            });

            totalMeeting = [...totalMeeting, ...data2];
            resolve(totalMeeting);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getStats = (start, end, curr, user) => {
  return new Promise(async (resolve, reject) => {
    const startTme = firebase.firestore.Timestamp.fromDate(start);
    const endDate = firebase.firestore.Timestamp.fromDate(end);
    const todayDate = firebase.firestore.Timestamp.fromDate(new Date());
    const userRef = firebase.firestore().collection('users').doc(user);
    console.log(startTme, endDate);
    let thisWeek = await firebase
      .firestore()
      .collection('meeting')
      .where('createdBy', '==', userRef)
      .where('scheduledAt', '>=', startTme)
      .where('scheduledAt', '<=', endDate)
      .where('type', '==', 'scheduled')
      .get();

    let upcomming = await firebase
      .firestore()
      .collection('meeting')
      .where('createdBy', '==', userRef)
      .where('scheduledAt', '>=', todayDate)
      .where('scheduledAt', '<=', endDate)
      .where('type', '==', 'scheduled')
      .get();

    resolve({ curr: thisWeek.docs.length, up: upcomming.docs.length });
  });
};

export const sendOtp = (mobile, meeting, password = '') => {
  return axios.post(`${endpoint}/misc/send-otp`, { mobile: mobile, meeting, password: password });
};

export const verifyOtp = (otp, id, mobile, name) => {
  return axios.post(`${endpoint}/meeting/joinwithotp`, { otp, id, mobile, name });
};

export const joinMeeting = (data) => {
  return axios.post(`${endpoint}/meeting/join`, data);
};

export const getMeetingDetails = (id) => {
  return axios.get(`${endpoint}/meeting/details/${id}`);
};

// export const getMeetingDetails = (id) => {
//   return new Promise((resolve, reject) => {
//     firebase
//       .firestore()
//       .collection('meeting')
//       .doc(id)
//       .get()
//       .then((snapshot) => {
//         console.log(snapshot, snapshot.data());
//         let data = snapshot.data();
//         resolve(data);
//       })
//       .catch((err) => {
//         console.log(err);
//         reject(err);
//       });
//   });
// };
