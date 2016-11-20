<template>
  <div class="login">
    <div class="row">
      <div class="col-sm-4 col-sm-offset-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2>Please login :)</h2>
          </div>
          <div class="panel-body">
            <div>
              <input type="text" class="form-control" name="username" id="username" value="" placeholder="Username" maxlength="15" v-model="username">
              <input type="password" class="form-control" name="password" id="password" value="" placeholder="Password" maxlength="15" v-model="password">
              <hr>
              <input type="button" class="btn btn-primary" id="loginButton" value="Login" v-on:click="login">
              <div>
                  <span class="label label-danger">{{ error }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import login from './script/login'

export default {
  name: 'login',
  data () {
    return {
      error: ''
    }
  },
  methods: {
    login: function () {
      this.$Progress.start()
      login.requestLogin(this.username, this.password).then(response => {
        this.error = ''
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
  .login {
    margin-top: 10rem;
    text-align: center;
  }

  input[type="text"], input[type="password"] {
    margin-top: 1rem;
  }
</style>
