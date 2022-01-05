/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */

import axios from 'axios';
const endpoint = 'https://us-central1-meetaap-55e58.cloudfunctions.net/app';

export const instantMeeting = async (data) => {
  return axios.post(`${endpoint}/meeting/instant`, data);
};
