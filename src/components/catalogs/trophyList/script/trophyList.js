import baseRequest from '../../../../lib/baseRequest'

function loadTrophies () {
  return baseRequest.get('/GetTrophies')
}

export default {
  loadTrophies: loadTrophies
}
