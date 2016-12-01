<template>
  <section class="new-user section">
    <div class="row">
      <h1>Create New User</h1>
    </div>
    <hr>
    <div class="row">
      <div class="panel">
        <div class="panel-body">
          <form v-on:submit.prevent="saveUser" class="col-sm-8 col-sm-offset-2">
            <div class="form-group">
              <input type="text" class="form-control" name="username" id="username" value="" placeholder="Username" maxlength="15" v-model="username" />
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="password" id="password" value="" placeholder="Password" maxlength="15" v-model="password" />
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="firstname" id="firstname" value="" placeholder="First Name" maxlength="30" v-model="lastname" />
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="lastname" id="lastname" value="" placeholder="Last Name" maxlength="30" v-model="lastname" />
            </div>
            <div class="form-group">
              <input type="email" class="form-control" name="email" id="email" value="" placeholder="E-mail" maxlength="255" v-model="email" />
            </div>
            <hr>
            <input type="submit" class="btn btn-primary" id="saveButton" value="Save" />
          </form>
        </div>
      </div>
    </div>
    <alerts :messages="resultMessages" />
  </section>
</template>

<script>
import newUser from './script/newUser'

export default {
  name: 'newUser',
  data () {
    return {
      resultMessages: newUser.resultMessages()
    }
  },
  methods: {
    saveUser () {
      this.$Progress.start()
      this.resultMessages = newUser.resultMessages()
      newUser.saveUser(this.username, this.password).then(response => {
        this.resultMessages.SUCCESS.active = true
        this.$Progress.finish()
      }).catch(error => {
        this.$Progress.fail()
        this.resultMessages.ERROR.active = true
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
