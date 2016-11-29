<template>
  <div class="dashboard">
    <div class="row">
      <h1>Add Trophy</h1>
    </div>
    <hr>
    <div class="class row">
      <div class="col-sm-4">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Trophy Name" maxlength="30" v-model="name">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Trophy Image" maxlength="200" v-model="image">
        </div>
        <div class="form-group">
          <textarea class="form-control" rows="8" cols="80" placeholder="Description" v-model="description"></textarea>
        </div>
        <div class="form-group">
          <input type="number" class="form-control" placeholder="Score Value" v-model="scoreAmount">
        </div>
        <div class="form-group">
          <input type="button" class="btn btn-info" value="Save" v-on:click="save">
        </div>
      </div>
    </div>
    <div class="row">
      <span class="label label-danger">{{ addTrophyError }}</span>
      <span class="label label-success">{{ successMessage }}</span>
    </div>
  </div>
</template>
<script>
  import addTrophy from './script/addTrophy'
  import baseRequest from '../../../lib/baseRequest'

  export default {
    name: 'addTrophy',
    data () {
      return {
        addTrophyError: '',
        successMessage: ''
      }
    },
    created () {

    },
    methods: {
      save: function () {
        this.$Progress.start()
        let data = {name: this.name, image: this.image, description: this.description, scoreAmount: this.scoreAmount}
        let error = addTrophy.validateForm(data)
        if (error.length > 0) {
          this.$Progress.fail()
          this.addTrophyError = error
        } else {
          this.addTrophyError = ''
          addTrophy.saveTrophy(data).then(response => {
            this.$Progress.finish()
            this.name = ''
            this.image = ''
            this.description = ''
            this.scoreAmount = 0
            this.successMessage = 'Trophy created! :)'
          }).catch(error => {
            this.addTrophyError = 'Error creating trophy :('
            baseRequest.errorHandler(error)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
