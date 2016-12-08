import baseRequest from '../../../../lib/baseRequest'

function loadAvatarItems () {
  return baseRequest.get('/GetUserAvatarItems')
}

export default {
  loadAvatarItems: loadAvatarItems
}
