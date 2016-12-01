import baseRequest from '../../../../lib/baseRequest'

function saveGivenMedal (data) {
  return baseRequest.post('/GiveMedal', data)
}

function loadUsers () {
  return baseRequest.get('/GetUsers')
}

function loadMedals () {
  return baseRequest.get('/GetMedals')
}

function validateForm (data) {
  let error = ''

  if (!data.userId || data.userId.length < 3) {
    error = 'UserId nos specified!'
  } else if (!data.medalId || data.medalId.length < 3) {
    error = 'Medal id not specified!'
  }
  return error
}

function resultMessages () {
  return {
    SUCCESS: {
      message: 'Medal was given! :)',
      type: 'success',
      active: false
    },
    ERROR: {
      message: 'Error giving Medal :(',
      type: 'danger',
      active: false
    },
    IMPUT_ERROR: {
      message: 'Please select user and medal',
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
  saveGivenMedal,
  validateForm,
  loadUsers,
  loadMedals,
  resultMessages
}
