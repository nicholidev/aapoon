/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import axios from 'axios';
const endpoint = 'https://us-central1-meetaap-55e58.cloudfunctions.net/app';

export const inviteUser = async (data) => {
  return axios.post(`${endpoint}/misc/send-invite`, data);
};

export const getInviteList = async (id) => {
  console.log('invite id', id);
  return axios.get(`${endpoint}/misc/invite-list?invitedBy=${id}`);
};

export const acceptInvitation = async (body) => {
  return axios.post(`${endpoint}/misc/accept-invite`, body);
};
