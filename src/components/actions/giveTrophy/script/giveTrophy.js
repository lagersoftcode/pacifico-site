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

  if (!data.username || data.username.length < 3) {
    error = 'Username nos specified!'
  } else if (!data.trophyId || data.trophyId.length < 3) {
    error = 'Trophy id not specified!'
  }
  return error
}

export default {
  saveGivenTrophy: saveGivenTrophy,
  validateForm: validateForm,
  loadUsers: loadUsers,
  loadTrophies: loadTrophies
}
