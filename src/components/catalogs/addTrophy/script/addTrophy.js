import baseRequest from '../../../../lib/baseRequest'

function saveTrophy (data) {
  return baseRequest.post('/CreateTrophy', data)
}

function validateForm (data) {
  let error = ''

  if (!data.name || data.name.length < 3) {
    error = 'Trophy must have a name!'
  } else if (!data.image || data.image.length < 3) {
    error = 'Trophy must have an image!'
  } else if (!data.description || data.description.length < 3) {
    error = 'Trophy must have a description!'
  } else if (!data.scoreAmount || !Number.isInteger(data.scoreAmount)) {
    error = 'Score must be an integer'
  }

  return error
}

function resultMessages () {
  return {
    SUCCESS: {
      message: 'trophy created! :)',
      type: 'success',
      active: false
    },
    ERROR: {
      message: 'Error creating trophy :(',
      type: 'danger',
      active: false
    },
    FORM_ERROR: {
      message: '',
      type: 'danger',
      active: false
    }
  }
}

export default {
  saveTrophy,
  validateForm,
  resultMessages
}
