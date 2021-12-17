import axios from 'axios';
const endpoint = 'http://localhost:5000/meetaap-55e58/us-central1/app';
export const phoneExists = (phone) => {
  return axios.get(`${endpoint}/misc/checkPhone/${phone}`);
};
