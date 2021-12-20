/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import axios from 'axios';
const endpoint = 'https://us-central1-meetaap-55e58.cloudfunctions.net/app';

export const inviteUser = async (data) => {
  return axios.post(`${endpoint}/meetaap-55e58/us-central1/app/misc/send-invite`, data);
};

export const getInviteList = async (id) => {
  console.log('invite id', id);
  return axios.get(`${endpoint}/meetaap-55e58/us-central1/app/misc/invite-list?invitedBy=${id}`);
};

export const acceptInvitation = async (body) => {
  return axios.post(`${endpoint}/meetaap-55e58/us-central1/app/misc/accept-invite`, body);
};
