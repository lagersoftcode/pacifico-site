import axios from 'axios'
import keyStorage from 'key-storage'
import config from '../siteconfig'

function get (path, query) {
  if (query) {
    query = `${query}&`
  } else {
    query = `?`
  }
  query = `${query}AuthToken=${keyStorage.get('AuthToken')}`
  console.log(query)
  return axios.get(`${config.SITE_API}${path}${query}`)
}

function post (path, data, noAuth) {
  data = data || {}
  if (!noAuth) {
    data['AuthToken'] = keyStorage.get('AuthToken')
  }
  return axios.post(`${config.SITE_API}${path}`, data)
}

export default {
  get: get,
  post: post
}
