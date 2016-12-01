import baseRequest from '../../../../lib/baseRequest'

function loadTrophies () {
  return baseRequest.get('/GetTrophies')
}

function resultMessages () {
  return {
    ERROR: {
      message: 'Error loading trophies',
      type: 'danger',
      active: false
    }
  }
}

export default {
  loadTrophies,
  resultMessages
}
