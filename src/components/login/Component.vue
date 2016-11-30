<template>
  <section class="login section">
    <div class="row">
      <div class="col-sm-4 col-sm-offset-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2>Please login :)</h2>
          </div>
          <div class="panel-body">
            <form v-on:submit.prevent="login">
              <div class="col-sm-12">
                <div class="form-group">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class="form-control"
                    value=""
                    placeholder="Username"
                    maxlength="15"
                    v-model="username"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    value=""
                    placeholder="Password"
                    maxlength="15"
                    v-model="password"
                  />
                </div>
              </div>
              <hr>
              <input type="submit" class="btn btn-primary" id="loginButton" value="Login" />
              <div>
                  <span class="label label-danger">{{ error }}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import keyStorage from 'key-storage'
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
        this.$Progress.finish()
        keyStorage.set('AuthToken', response.data.AuthToken)

        let redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
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
</style>
