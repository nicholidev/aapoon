/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import axios from 'axios';
const endpoint = process.env.NEXT_PUBLIC_FUNCTION_URL;

export const inviteUser = async (data) => {
  return axios.post(`${endpoint}/misc/send-invite`, data);
};

export const getInviteList = async (id) => {
  return axios.get(`${endpoint}/misc/invite-list?invitedBy=${id}`);
};

export const acceptInvitation = async (body) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${endpoint}/misc/accept-invite`, body)
      .then((res) => resolve())
      .catch((err) => {
        resolve();
      });
  });
};

export const getCountry = () => {
  return axios.get(`https://ipapi.co/json/`);
};

export const closeAccount = (body) => axios
  .post(`${endpoint}/account/close`, body);

export const getAssigned = (body) => axios
  .post(`${endpoint}/account/get-assigned`, body);