/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';
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
            prices.push({ ...doc.data(), id: doc.id });
          });
          productItem.prices = prices;

          allProducts.push(productItem);
        }

        resolve(allProducts);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getCheckoutSession = async (price) => {
  return new Promise(async (resolve, reject) => {
    const docRef = await firebase
      .firestore()
      .collection('customers')
      .doc(firebase.auth().currentUser.uid)
      .collection('checkout_sessions')
      .add({
        line_items: [{ price: price, adjustable_quantity: { enabled: true, maximum: 999 }, quantity: 1 }],
        allow_promotion_codes: true,
        tax_rates: ['txr_1KUVrASJOhf2FXpTqycP9RXN'],

        tax_id_collection: true,
        success_url: window.location.origin + '/msg/success',
        cancel_url: window.location.origin + '/plan/plans-price',
      });
    // Wait for the CheckoutSession to get attached by the extension
    docRef.onSnapshot((snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
        reject(`An error occured: ${error.message}`);
      }
      if (url) {
        console.log(url);
        resolve(url);
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
      }
    });
  });
};

export const openCustomerPortal = async () => {
  return new Promise(async (resolve, reject) => {
    const functionRef = firebase.app().functions('us-central1').httpsCallable(process.env.NEXT_PUBLIC_CUSTOMER_PORTAL);
    const { data } = await functionRef({
      returnUrl: window.location.origin,
      locale: 'auto', // Optional, defaults to "auto"
      // Optional ID of a portal configuration: https://stripe.com/docs/api/customer_portal/configuration
    });
    resolve(data.url);
  });
};
