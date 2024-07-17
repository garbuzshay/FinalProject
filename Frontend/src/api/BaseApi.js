
import axios from 'axios';
import {auth} from '../configuration/firebaseConfig';

// Function to get the token from Firebase
const getToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

export default class BaseApi {
    constructor(baseURL) {
      this.api = axios.create({
        baseURL: baseURL,
      });
  
      // Add a request interceptor
      this.api.interceptors.request.use(
        async (config) => {
          const token = await getToken();
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
  }