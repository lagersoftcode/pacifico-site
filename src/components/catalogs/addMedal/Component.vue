<template>
  <section class="dashboard">
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
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Diamond">Diamond</option>
                <option value="Platinum">Platinum</option>
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
    <alerts :messages="resultMessages" />
  </section>
</template>
<script>
  import addMedal from './script/addMedal'
  import baseRequest from '../../../lib/baseRequest'

  export default {
    name: 'addMedal',
    data () {
      return {
        resultMessages: addMedal.resultMessages()
      }
    },
    created () {

    },
    methods: {
      save () {
        this.$Progress.start()
        this.resultMessages = addMedal.resultMessages()
        let data = {name: this.name, image: this.image, description: this.description, material: this.material, scoreAmount: this.scoreAmount}
        let error = addMedal.validateForm(data)
        if (error.length > 0) {
          this.$Progress.fail()
          this.resultMessages.FORM_ERROR.message = error
          this.resultMessages.FORM_ERROR.active = true
        } else {
          addMedal.saveMedal(data).then(response => {
            this.$Progress.finish()
            this.name = ''
            this.image = ''
            this.description = ''
            this.scoreAmount = 0
            this.resultMessages.SUCCESS.active = true
          }).catch(error => {
            this.resultMessages.ERROR.active = true
            baseRequest.errorHandler(error)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
