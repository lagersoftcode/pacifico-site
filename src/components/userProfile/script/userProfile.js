import baseRequest from '../../../lib/baseRequest'

function loadTrophies (userId) {
  return baseRequest.get('/GetUserTrophies', `?userId=${userId}`)
}

function loadMedals (userId) {
  return baseRequest.get('/GetUserMedals', `?userId=${userId}`)
}

function loadLastKudos (userId) {
  return baseRequest.get('/GetUserLastKudos', `?userId=${userId}`)
}

export default {
  loadTrophies: loadTrophies,
  loadMedals: loadMedals,
  loadLastKudos: loadLastKudos
}
