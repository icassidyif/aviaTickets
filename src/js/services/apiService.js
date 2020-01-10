import axios from 'axios';
import config from '../config/apiConfig';

class Api {
  constructor(config) {
    this.url = config.url;
  }

  async countries() {
    try {
      const response = await axios.get(`${this.url}/countries`);
      return Promise.resolve(response.data);
    }catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }
  async cities() {
    try {
      const response = await axios.get(`${this.url}/cities`);
      return Promise.resolve(response.data);
    }catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  async prices(params) {
    try {
      const response = await axios.get(`${this.url}/prices/cheap`, {
        params
      });
      return Promise.resolve(response.data);
    }catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  async airlines() {
    try {
      const response = await axios.get(`${this.url}/airlines`);
      return Promise.resolve(response.data);
    }catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }
}

const api = new Api(config);

export default api;
