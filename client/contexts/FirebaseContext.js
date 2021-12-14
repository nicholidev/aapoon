import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { FIREBASE_API } from '../config';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

const ADMIN_EMAILS = ['demo@minimals.cc'];

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_API);
  firebase.firestore();
}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  if (action.type === 'UPDATE') {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: 'firebase',
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginWithFaceBook: () => Promise.resolve(),
  loginWithTwitter: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  let router = useRouter();
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        // if (!user.phoneNumber) {
        //   // Ask user for phone number.
        //   var phoneNumber = window.prompt('Provide your phone number');
        //   // You also need to provide a button element signInButtonElement
        //   // which the user would click to complete sign-in.
        //   // Get recaptcha token. Let's use invisible recaptcha and hook to the button.
        //   var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        //   // This will wait for the button to be clicked the reCAPTCHA resolved.
        //   return user.linkWithPhoneNumber(phoneNumber, appVerifier).then(function (confirmationResult) {
        //     // Ask user to provide the SMS code.
        //     var code = window.prompt('Provide your SMS code');
        //     // Complete sign-in.
        //     return confirmationResult.confirm(code);
        //   });
        // }

        if (user) {
          if (user.emailVerified === false || !user?.phoneNumber) {
            router.push('/auth/VerificationProcess');
            localStorage.setItem('isAuthenticated', false);
          } else {
            router.replace('/dashboard/one');
            localStorage.setItem('isAuthenticated', true);
          }
          const docRef = firebase.firestore().collection('users').doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                setProfile(doc.data());
              }
            })
            .catch((error) => {
              console.error(error);
            });

          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: false, user: null },
          });
          localStorage.setItem('isAuthenticated', false);
        }
      }),
    [dispatch]
  );

  const login = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const resendEmailVerification = () => {
    return state.user.sendEmailVerification();
  };

  const register = (email, password, firstName, lastName, phoneNumber) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user && res.user.emailVerified === false) {
          res.user.sendEmailVerification().then(function () {
            console.log('email verification sent to user');
          });
        }

        firebase
          .firestore()
          .collection('users')
          .doc(res.user.uid)
          .set({
            uid: res.user.uid,
            email,
            displayName: `${firstName} ${lastName}`,
            phoneNumber: phoneNumber,
          });
      });

  const logout = async () => {
    await firebase.auth().signOut();
    router.replace('/');
    localStorage.setItem('isAuthenticated', false);
  };

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const sendMobileVerificationCode = async () => {
    try {
      var appVerifier = state.appVerifier
        ? state.appVerifier
        : await new firebase.auth.RecaptchaVerifier('captcha-container', {
            size: 'invisible',
          });

      let confirmation = await state.user.linkWithPhoneNumber(
        state.user?.phoneNumber || profile?.phoneNumber,
        appVerifier
      );
      dispatch({
        type: 'UPDATE',
        payload: { confirmation: confirmation, appVerifier },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const verifyMobileLinkCode = (code) => {
    return state.confirmation.confirm(code);
  };

  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          isEmailVerified: state.user?.emailVerified,
          id: state.user?.uid,
          email: state.user?.email,
          photoURL: state.user?.photoURL || profile?.photoURL,
          displayName: state.user?.displayName || profile?.displayName,

          phoneNumber: state.user?.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || '',
          isPublic: profile?.isPublic || false,
        },
        login,
        register,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
        resetPassword,
        resendEmailVerification,
        sendMobileVerificationCode,
        verifyMobileLinkCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
