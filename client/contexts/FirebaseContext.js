/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { FIREBASE_API } from '../config';
import { useRouter } from 'next/router';
import { phoneExists } from '../services/misc-service';
import { acceptInvitation, getCountry } from './../api/user';
import { addJWTInterceptor } from '../utils/Interceptor';
// ----------------------------------------------------------------------

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_API);
  firebase.firestore();
}

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  loading: true,
  user: null,
  locale: {},
};

const reducer = (state, action) => {
  console.log(state, action);
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }
  if (action.type === 'TOGGLE_LOADING') {
    return {
      ...state,
      loading: action.payload,
    };
  }

  if (action.type === 'UPDATE') {
    return {
      ...state,
      ...action.payload,
    };
  }
  if (action.type == 'UPDATE_LOCALE') {
    return {
      ...state,
      locale: action.payload.locale,
    };
  }
  if (action.type === 'UPDATE_SUB') {
    return {
      ...state,
      user: { ...state.user, ...action.payload },
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
  useEffect(() => {
    dispatch({ type: 'TOGGLE_LOADING', payload: true });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          localStorage.setItem('authToken', token);
          addJWTInterceptor(token);
        });
        const docRef = firebase.firestore().collection('users').doc(user.uid);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setProfile(doc.data());
              if (doc.data().accountType == 'Business' && !doc.data().businessDetails && user.phoneNumber)
                router.push('/auth/business-profile');
              else {
                localStorage.setItem('isAuthenticated', true);
                firebase
                  .firestore()
                  .collection('users')
                  .doc(user.uid)
                  .get()
                  .then((response) => {
                    dispatch({
                      type: 'UPDATE',
                      payload: { isAuthenticated: true, user: { ...state.user, ...response.data() } },
                    });
                  });
              }
            }
            dispatch({ type: 'TOGGLE_LOADING', payload: false });
          })
          .catch((error) => {
            console.error(error);
            dispatch({ type: 'TOGGLE_LOADING', payload: false });
          });

        dispatch({
          type: 'INITIALISE',
          payload: { isAuthenticated: true, user },
        });
        if (!user?.phoneNumber) {
          router.push('/auth/VerificationProcess');
          localStorage.removeItem('isAuthenticated');
        } else {
        }
      } else {
        dispatch({
          type: 'INITIALISE',
          payload: { isAuthenticated: false, user: null },
        });
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authToken');
        dispatch({ type: 'TOGGLE_LOADING', payload: false });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    let unsub;
    if (state.user?.uid) {
      unsub = firebase
        .firestore()
        .collection('customers')
        .doc(state.user.uid)
        .collection('subscriptions')
        .where('status', 'in', ['trialing', 'active', 'past_due'])
        .onSnapshot(async (snapshot) => {
          let docs = [];
          // In this implementation we only expect one active or trialing subscription to exist.
          for (const doc of snapshot.docs) {
            let data = doc.data();
            let product = (await data.product.get()).data();
            docs.push({ ...data, product });
          }

          console.log(docs);
          dispatch({
            type: 'UPDATE_SUB',
            //payload: {},
            payload: { subscription: docs },
          });
        });
    }
  }, [state.user?.uid]);

  useEffect(() => {
    if (state.user?.uid) {
      firebase
        .firestore()
        .collection('users')
        .doc(state.user.uid)
        .collection('licences')
        .doc('premium')
        .onSnapshot(async (snapshot) => {
          dispatch({
            type: 'UPDATE_SUB',
            //payload: {},
            payload: {
              activeLicenses: { count: snapshot.data()?.count || 0, assigned: snapshot.data()?.assigned || 0 },
            },
          });
        });
    }
  }, [state.user?.uid, state.user?.subscription]);

  useEffect(() => {
    getCountry().then((res) => {
      console.log(res.data);
      dispatch({
        type: 'UPDATE_LOCALE',
        //payload: {},
        payload: {
          locale: res.data,
        },
      });
    });
  }, []);

  const login = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const deleteAccount = () => {
    firebase.auth().currentUser.delete();
    dispatch({
      type: 'UPDATE',
      payload: {
        user: {},
      },
    });
    window.location = '/';

    localStorage.removeItem('isAuthenticated');
    localStorage.clear();
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
    //return state.user.sendEmailVerification();
  };

  const registerBusiness = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      if (data.logo) {
        var storageRef = firebase.storage().ref();
        var busRef = storageRef.child(`account/${state.user.uid}/business/logo/${data.logo.name}`);
        console.log('business rej2');
        busRef
          .put(data.logo)
          .then(async (snapshot) => {
            const downloadURL = await snapshot.ref.getDownloadURL();
            firebase
              .firestore()
              .collection('users')
              .doc(state.user.uid)
              .update({
                businessDetails: { ...data, logo: downloadURL },
              })
              .then((response) => {
                dispatch({
                  type: 'UPDATE',
                  payload: { user: { ...state.user, businessDetails: { ...data, logo: downloadURL } } },
                });
                resolve('success');
              });
          })
          .catch((err) => reject(err));
      } else {
        delete data.logo;
        firebase
          .firestore()
          .collection('users')
          .doc(state.user.uid)
          .update({
            businessDetails: { ...data },
          })
          .then((response) => {
            resolve('success');

            dispatch({
              type: 'UPDATE',
              payload: { user: { ...state.user, businessDetails: { ...data } } },
            });
          })
          .catch((err) => reject(err));
      }
    });
  };

  const updateProfile = (data) => {
    return new Promise((resolve, reject) => {
      if (data.profilePic) {
        var storageRef = firebase.storage().ref();
        var busRef = storageRef.child(`account/${state.user.uid}/user/profilePic/${data.profilePic.name}`);
        busRef
          .put(data.profilePic)
          .then(async (snapshot) => {
            const downloadURL = await snapshot.ref.getDownloadURL();
            firebase
              .firestore()
              .collection('users')
              .doc(state.user.uid)
              .update({
                profilePic: downloadURL,
                displayName: data.firstName + ' ' + data.lastName,
              })
              .then((response) => {
                resolve('success');
              });

            firebase.auth().currentUser.updateProfile({
              displayName: data.firstName + ' ' + data.lastName,
              photoURL: downloadURL,
            });
            dispatch({
              type: 'UPDATE',
              payload: {
                user: { ...state.user, displayName: data.firstName + ' ' + data.lastName, profilePic: downloadURL },
              },
            });
          })
          .catch((err) => reject(err));
      } else {
        firebase
          .firestore()
          .collection('users')
          .doc(state.user.uid)
          .update({
            displayName: data.firstName + ' ' + data.lastName,
          })
          .then((response) => {
            resolve('success');
            firebase.auth().currentUser.updateProfile({
              displayName: data.firstName + ' ' + data.lastName,
            });
            dispatch({
              type: 'UPDATE',
              payload: { user: { ...state.user, displayName: data.firstName + ' ' + data.lastName } },
            });
          })

          .catch((err) => reject(err));
      }
    });
  };

  const register = (email, password, firstName, lastName, phoneNumber, allValues) => {
    return new Promise((resolve, reject) => {
      phoneExists(phoneNumber, email)
        .then((res) => {
          return reject({ code: res.data.message });
        })
        .catch(async (err) => {
          if (err.response && err.response.data.code) {
            var appVerifier = state.appVerifier
              ? state.appVerifier
              : await new firebase.auth.RecaptchaVerifier('captcha-container', {
                  size: 'invisible',
                });

            firebase
              .auth()
              .signInWithPhoneNumber(phoneNumber, appVerifier)
              .then((confirmationResult) => {
                router.push('/auth/VerificationProcess');
                resolve('success');
                dispatch({
                  type: 'UPDATE',
                  payload: {
                    confirmation: confirmationResult,
                    appVerifier,
                    user: { ...allValues, phoneNumber: phoneNumber },
                  },
                });
              })
              .catch((err) => {
                reject(err);
              });
          }
        });
    });
  };

  const logout = async () => {
    await firebase.auth().signOut();
    dispatch({
      type: 'UPDATE',
      payload: {
        user: {},
      },
    });
    window.location = '/';

    localStorage.removeItem('isAuthenticated');
    localStorage.clear();
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

      let confirmation = await firebase.auth().signInWithPhoneNumber(state.user.phoneNumber, state.appVerifier);
      dispatch({
        type: 'UPDATE',
        payload: { confirmation: confirmation, appVerifier },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const verifyMobileLinkCode = (code) => {
    return new Promise((resolve, reject) => {
      state.confirmation
        .confirm(code)
        .then((item) => {
          var credential = firebase.auth.EmailAuthProvider.credential(state.user.email, state.user.password);
          item.user
            .linkWithCredential(credential)
            .then((usercred) => {
              if (localStorage.getItem('inviteToken'))
                acceptInvitation({ email: state.user.email, token: localStorage.getItem('inviteToken') });
              var user = usercred.user;

              user.updateProfile({ displayName: state.user.firstName + ' ' + state.user.lastName });

              firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .set({
                  uid: user.uid,
                  email: user.email,
                  displayName: `${state.user.firstName} ${state.user.lastName}`,
                  phoneNumber: state.user.phoneNumber,
                  accountType: state.user.accountType,
                  accountDetails: {
                    businessType: state.user.businessType ? state.user.businessType : '',
                    numberOfEmployees: state.user.numberOfEmployees ? state.user.numberOfEmployees : '',
                    professionType: state.user.professionType ? state.user.professionType : '',
                  },
                })
                .then((result) => {
                  resolve(user);

                  console.log(result);
                })
                .catch((err) => {
                  reject(err);
                });
              dispatch({
                type: 'INITIALISE',
                payload: {
                  isAuthenticated: false,
                  user: {
                    ...user,

                    uid: user.uid,
                    email: user.email,
                    displayName: `${state.user.firstName} ${state.user.lastName}`,
                    phoneNumber: state.user.phoneNumber,
                    accountType: state.user.accountType,
                    accountDetails: {
                      businessType: state.user.businessType ? state.user.businessType : '',
                      numberOfEmployees: state.user.numberOfEmployees ? state.user.numberOfEmployees : '',
                      professionType: state.user.professionType ? state.user.professionType : '',
                    },
                  },
                },
              });
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const setLoading = (payload) => {
    dispatch({ type: 'TOGGLE_LOADING', payload: payload });
  };

  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        confirmation: state.confirmation,
        appVerifier: state.appVerifier,
        method: 'firebase',
        loading: state.loading,
        locale: state.locale,
        user: {
          isEmailVerified: state.user?.emailVerified,
          id: state.user?.uid,
          email: state.user?.email,
          photoURL: state.user?.photoURL || profile?.photoURL,
          displayName: state.user?.displayName || profile?.displayName,
          activeLicenses: { count: 0, assigned: 0 },
          phoneNumber: state.user?.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || '',
          isPublic: profile?.isPublic || false,
          ...profile,
          ...state.user,
        },
        login,
        register,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
        setLoading,
        deleteAccount,
        resetPassword,
        updateProfile,
        registerBusiness,
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
