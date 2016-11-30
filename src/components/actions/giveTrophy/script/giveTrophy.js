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

export default {
  saveGivenTrophy: saveGivenTrophy,
  validateForm: validateForm,
  loadUsers: loadUsers,
  loadTrophies: loadTrophies
}
