import baseRequest from '../../../../lib/baseRequest'

function loadMedals () {
  return baseRequest.get('/GetMedals')
}

function resultMessages () {
  return {
    ERROR: {
      message: 'Error loading medals',
      type: 'danger',
      active: false
    }
  }
}

export default {
  loadMedals,
  resultMessages
}
