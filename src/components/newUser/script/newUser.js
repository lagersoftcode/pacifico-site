import baseRequest from '../../../lib/baseRequest'

function saveUser (data) {
  return baseRequest.post('/CreateUser', data, false)
}

function validateForm (data) {
  let error = ''

  if (!data.username || data.username.length < 3) {
    error = 'User must have an username!'
  } else if (!data.firstname || data.firstname.length < 3) {
    error = 'User must have a firstname!'
  } else if (!data.lastname || data.lastname.length < 3) {
    error = 'User must have a lastname!'
  } else if (!data.password || data.password.length < 3) {
    error = 'User must have a password!'
  } else if (!data.category || data.category.length < 3) {
    error = 'User must have a category!'
  } else if (!data.email || data.email.length < 3) {
    error = 'User must have an email!'
  }

  return error
}

function resultMessages () {
  return {
    SUCCESS: {
      message: ' User Created',
      type: 'success',
      active: false
    },
    ERROR: {
      message: 'Error creating User',
      type: 'danger',
      active: false
    },
    FORM_ERROR: {
      message: '',
      type: 'danger',
      active: false
    }
  }
}

export default {
  saveUser,
  resultMessages,
  validateForm
}
