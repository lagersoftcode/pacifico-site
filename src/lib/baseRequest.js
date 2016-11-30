import axios from 'axios'
import storage from 'key-storage'
import config from '../siteconfig'

function get (path, query) {
  if (query) {
    query = `${query}&`
  } else {
    query = `?`
  }
  query = `${query}AuthToken=${storage.get('AuthToken')}`
  return axios.get(`${config.SITE_API}${path}${query}`)
}

function post (path, data, noAuth) {
  if (!noAuth) {
    path = `${path}?AuthToken=${storage.get('AuthToken')}`
  }
  return axios.post(`${config.SITE_API}${path}`, data)
}

function errorHandler (error) {
  console.log(error)
  if (error.response && error.response.status === 401) {
    storage.remove('AuthToken')
    window.location.reload()
  }
}

export default {
  get: get,
  post: post,
  errorHandler: errorHandler
}
