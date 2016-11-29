import baseRequest from '../../../lib/baseRequest'

function saveUser (username, password) {
  return baseRequest.post('/CreateUser', { username, password }, false)
}

export default {
  saveUser
}
