import baseRequest from '../../../../lib/baseRequest'

function saveMedal (data) {
  return baseRequest.post('/CreateMedal', data)
}

function validateForm (data) {
  let error = ''

  if (!data.name || data.name.length < 3) {
    error = 'Medal must have a name!'
  } else if (!data.image || data.image.length < 3) {
    error = 'Medal must have an image!'
  } else if (!data.description || data.description.length < 3) {
    error = 'Medal must have a description!'
  } else if (!data.material || data.material.length < 3) {
    error = 'Medal must have a material!'
  } else if (!data.scoreAmount || !Number.isInteger(data.scoreAmount)) {
    error = 'Score must be an integer'
  }
  return error
}

export default {
  saveMedal: saveMedal,
  validateForm: validateForm
}
