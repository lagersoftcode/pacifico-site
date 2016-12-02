import baseRequest from '../../../lib/baseRequest'

function loadUsers () {
  return baseRequest.get('/GetUsers')
}

function giveKudo (data) {
  return baseRequest.post('/GiveKudo', data)
}

function resultMessages () {
  return {
    KudoSuccess: {
      message: 'Kudo was given successfuly!',
      type: 'success',
      active: false
    },
    KudoLimit: {
      message: 'No matter how much you want to thank you can not give kudos that often :(',
      type: 'danger',
      active: false
    },
    KudoError: {
      message: 'There was an error giving a kudo :(',
      type: 'danger',
      active: false
    }
  }
}

export default {
  loadUsers: loadUsers,
  giveKudo: giveKudo,
  resultMessages: resultMessages
}
