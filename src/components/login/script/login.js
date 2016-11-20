import config from '../../../siteconfig'
import axios from 'axios'

function login (username, password) {
  return axios.post(`${config.SITE_API}/Login`, { username: username, password: password })
}

export default {
  requestLogin: login
}
