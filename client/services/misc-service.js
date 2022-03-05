/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import axios from 'axios';
const endpoint = process.env.NEXT_PUBLIC_FUNCTION_URL;
export const phoneExists = (phone, email) => {
  return axios.get(`${endpoint}/misc/checkPhone/${phone}/${email}`);
};
