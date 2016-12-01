import baseRequest from '../../../lib/baseRequest'

function saveUser (username, password) {
  return baseRequest.post('/CreateUser', { username, password }, false)
}

function resultMessages () {
  return {
    SUCCESS: {
      message: 'Success',
      type: 'success',
      active: false
    },
    ERROR: {
      message: 'Error',
      type: 'danger',
      active: false
    }
  }
}

export default {
  saveUser,
  resultMessages
}
