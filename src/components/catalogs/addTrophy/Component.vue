<template>
  <div class="dashboard">
    <div class="row">
      <h1>Add Trophy</h1>
    </div>
    <hr>
    <div class="row">
      <div class="panel">
        <div class="panel-body">
          <form class="col-sm-8 col-sm-offset-2" v-on:submit.prevent="save">
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
              <input type="submit" class="btn btn-info" value="Save">
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="addTrophyError !==''" class="alert alert-danger" role="alert">
        <strong>Error!</strong> {{ addTrophyError }}
      </div>

      <div v-if="successMessage !== ''" class="alert alert-success" role="alert">
        <strong>Success!</strong> {{ successMessage }}
      </div>
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
      save () {
        this.$Progress.start()
        this.addTrophyError = ''
        this.successMessage = ''
        let data = {
          name: this.name,
          image: this.image,
          description: this.description,
          scoreAmount: this.scoreAmount
        }
        let error = addTrophy.validateForm(data)
        if (error.length > 0) {
          this.$Progress.fail()
          this.addTrophyError = error
        } else {
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
