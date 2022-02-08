/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { getApp } from '@firebase/app';
import { getStripePayments } from '@stripe/firestore-stripe-payments';
import { getProducts } from '@stripe/firestore-stripe-payments';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
export const getAllProducts = async (body) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('products')
      .where('active', '==', true)
      .get()
      .then(async (querySnapshot) => {
        var allProducts = [];

        for (const doc of querySnapshot.docs) {
          let productItem = await doc.data();
          let prices = [];

          const priceSnap = await doc.ref.collection('prices').where('active', '==', true).get();
          priceSnap.docs.forEach(async (doc) => {
            prices.push(await doc.data());
          });
          productItem.prices = prices;

          allProducts.push(productItem);
        }
        console.log(allProducts);
        resolve(allProducts);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
