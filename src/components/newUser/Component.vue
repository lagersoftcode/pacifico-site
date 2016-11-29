<template>
  <div class="new-user section">
    <div class="row">
      <h1>Create New User</h1>
    </div>
    <hr>
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-body">
          <form v-on:submit.prevent="saveUser" class="col-sm-8 col-sm-offset-2">
            <input type="text" class="form-control" name="username" id="username" value="" placeholder="Username" maxlength="15" v-model="username" />
            <input type="text" class="form-control" name="password" id="password" value="" placeholder="Password" maxlength="15" v-model="password" />
            <input type="text" class="form-control" name="firstname" id="firstname" value="" placeholder="First Name" maxlength="30" v-model="lastname" />
            <input type="text" class="form-control" name="lastname" id="lastname" value="" placeholder="Last Name" maxlength="30" v-model="lastname" />
            <input type="email" class="form-control" name="email" id="email" value="" placeholder="E-mail" maxlength="255" v-model="email" />
            <hr>
            <input type="submit" class="btn btn-primary" id="saveButton" value="Save" />
            <div>
                <span class="label label-danger">{{ error }}</span>
                <span class="label label-success">{{ success }}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import newUser from './script/newUser'

export default {
  name: 'newUser',
  data () {
    return {
      error: '',
      success: ''
    }
  },
  methods: {
    saveUser () {
      this.$Progress.start()
      this.error = ''
      this.success = ''
      newUser.saveUser(this.username, this.password).then(response => {
        this.success = 'User created'
        this.$Progress.finish()
      }).catch(error => {
        this.$Progress.fail()
        this.error = 'Error!'
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  
</style>
