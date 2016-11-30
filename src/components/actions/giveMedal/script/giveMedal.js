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

export default {
  saveGivenMedal: saveGivenMedal,
  validateForm: validateForm,
  loadUsers: loadUsers,
  loadMedals: loadMedals
}
