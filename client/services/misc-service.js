/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import axios from 'axios';
const endpoint = 'https://us-central1-meetaap-55e58.cloudfunctions.net/app';
export const phoneExists = (phone, email) => {
  return axios.get(`${endpoint}/misc/checkPhone/${phone}/${email}`);
};
