import baseRequest from '../../../../lib/baseRequest'

function saveGivenTrophy (data) {
  return baseRequest.post('/GiveTrophy', data)
}

function loadUsers () {
  return baseRequest.get('/GetUsers')
}

function loadTrophies () {
  return baseRequest.get('/GetTrophies')
}

function validateForm (data) {
  let error = ''

  if (!data.userId || data.userId.length < 3) {
    error = 'UserId nos specified!'
  } else if (!data.trophyId || data.trophyId.length < 3) {
    error = 'Trophy id not specified!'
  }
  return error
}

function resultMessages () {
  return {
    SUCCESS: {
      message: 'Trophy was given! :)',
      type: 'success',
      active: false
    },
    ERROR: {
      message: 'Error giving trophy :(',
      type: 'danger',
      active: false
    },
    IMPUT_ERROR: {
      message: 'Please select user and trophy',
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
  saveGivenTrophy,
  validateForm,
  loadUsers,
  loadTrophies,
  resultMessages
}
