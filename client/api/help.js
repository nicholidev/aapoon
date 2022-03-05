/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';

export const addHelp = (data) => {
  return new Promise((resolve, reject) => {
    if (data.uploadFile) {
      var storageRef = firebase.storage().ref();
      var busRef = storageRef.child(`help/${data.email}/${data.uploadFile}`);

      busRef
        .put(data.uploadFile)
        .then(async (snapshot) => {
          const downloadURL = await snapshot.ref.getDownloadURL();
          firebase
            .firestore()
            .collection('help')
            .add({ ...data, uploadFile: downloadURL })

            .then((ref) => {
              resolve(ref);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      firebase
        .firestore()
        .collection('help')
        .add({ ...data })

        .then((ref) => {
          resolve(ref);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }
  });
};
