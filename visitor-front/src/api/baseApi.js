import axios from 'axios';

export default class BaseApi {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL,
      withCredentials: true,
    });

    // Add a request interceptor
    this.api.interceptors.request.use(
      async (config) => {
        // You can add custom headers or other configurations here
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
