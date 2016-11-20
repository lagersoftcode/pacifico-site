import baseRequest from '../../../lib/baseRequest'

function loadUsers () {
  return baseRequest.get('/GetUsers')
}

export default {
  loadUsers: loadUsers
}
