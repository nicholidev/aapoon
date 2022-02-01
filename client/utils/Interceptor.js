/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import axios from 'axios';

import firebase from 'firebase/compat/app';

export const addJWTInterceptor = async (token) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const errorHandlerInterceptor = (dispatch) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error.response.status);
      // if (error.response.status === 401 || error.response.status === 403) {
      //   firebase.auth.logout();
      // }
      return Promise.reject(error);
    }
  );
};
