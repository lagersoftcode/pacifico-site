<template>
  <div class="dashboard">
    <div class="row">
      <h1>Add Medal</h1>
    </div>
    <hr>
    <div class="row">
      <div class="panel">
        <div class="panel-body">
          <form class="col-sm-8 col-sm-offset-2" v-on:submit.prevent="save">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Medal Name" maxlength="30" v-model="name">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Medal Image" maxlength="200" v-model="image">
            </div>
            <div class="form-group">
              <textarea class="form-control" rows="8" cols="80" placeholder="Description" v-model="description"></textarea>
            </div>
            <div class="form-group">
              <select class="form-control" v-model="material">
                <option value="1">Bronze</option>
                <option value="2">Silver</option>
                <option value="3">Gold</option>
                <option value="4">Diamond</option>
                <option value="5">Platinum</option>
              </select>
            </div>
            <div class="form-group">
              <input type="number" class="form-control" placeholder="Score Value" v-model="scoreAmount">
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-info" value="Save" >
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <span class="label label-danger">{{ addMedalError }}</span>
      <span class="label label-success">{{ successMessage }}</span>
    </div>
  </div>
</template>
<script>
  import addMedal from './script/addMedal'
  import baseRequest from '../../../lib/baseRequest'

  export default {
    name: 'addMedal',
    data () {
      return {
        addMedalError: '',
        successMessage: ''
      }
    },
    created () {

    },
    methods: {
      save () {
        this.$Progress.start()
        let data = {name: this.name, image: this.image, description: this.description, material: Number.parseInt(this.material), scoreAmount: this.scoreAmount}
        let error = addMedal.validateForm(data)
        if (error.length > 0) {
          this.$Progress.fail()
          this.addMedalError = error
        } else {
          this.addMedalError = ''
          addMedal.saveMedal(data).then(response => {
            this.$Progress.finish()
            this.name = ''
            this.image = ''
            this.description = ''
            this.scoreAmount = 0
            this.successMessage = 'Medal created! :)'
          }).catch(error => {
            this.addMedalError = 'Error creating trophy :('
            baseRequest.errorHandler(error)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
