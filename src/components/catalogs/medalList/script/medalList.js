import baseRequest from '../../../../lib/baseRequest'

function loadMedals () {
  return baseRequest.get('/GetMedals')
}

export default {
  loadMedals: loadMedals
}
