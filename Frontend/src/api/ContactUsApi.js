// Frontend/src/api/ContactUsApi.js

import config from '../config.js';
import BaseApi from './BaseApi.js';

const { apiBaseUrl } = config;

class ContactUsApi extends BaseApi {
  constructor() {
    super(apiBaseUrl);
  }

  async sendContactForm(contactData) {
    try {
      const response = await this.api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error('Error sending contact form:', error);
      throw error;
    }
  }
}

const contactUsApi = new ContactUsApi();
export default contactUsApi;
