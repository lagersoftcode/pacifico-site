import baseRequest from '../../../../lib/baseRequest'

function loadLastActions () {
  return baseRequest.get('/GetLastActions')
}

export default {
  loadLastActions: loadLastActions
}
