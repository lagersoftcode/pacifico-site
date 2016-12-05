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
              <input type="text" class="form-control" name="firstname" id="firstname" value="" placeholder="First Name" maxlength="30" v-model="firstname" />
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="lastname" id="lastname" value="" placeholder="Last Name" maxlength="30" v-model="lastname" />
            </div>
            <div class="form-group">
              <input type="email" class="form-control" name="email" id="email" value="" placeholder="E-mail" maxlength="255" v-model="email" />
            </div>
            <div class="form-group">
              <select class="form-control" v-model="category">
                <option value="Software Engineer">Software Engineer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value=">Mobile Developer">Mobile Developer</option>
                <option value="Designer">Designer</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Accountant">Accountant</option>
                <option value="Accountant">Accountant</option>
                <option value="Seller">Seller</option>
                <option value="Administrative">Administrative</option>
                <option value="Executive">Executive</option>
                <option value="Call Center">Call Center</option>
                <option value="Support">Support</option>
                <option value="Quality">Quality</option>
              </select>
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
      let data = {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        category: this.category
      }
      let error = newUser.validateForm(data)
      if (error.length > 0) {
        this.$Progress.fail()
        this.resultMessages.FORM_ERROR.message = error
        this.resultMessages.FORM_ERROR.active = true
      } else {
        newUser.saveUser(data).then(response => {
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
}
</script>

<style scoped>

</style>
