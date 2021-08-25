import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8083/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'allp');
  }

  getUserBoard() {
    return axios.get(API_URL + 'userp', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'modp', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'adminp', { headers: authHeader() });
  }
}

export default new UserService();