<template>
  <div class="login">
    <div class="row">
      <h1>Dashboard</h1>
    </div>
    <hr>
    <div class="row">
      <span class="label label-info" v-if="!usersLoaded">Loading users...</span>
      <div class="col-md-4" v-for="user in users">
        <div class="panel panel-info">
          <div class="panel-heading">
            {{ user.UserName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dashboard from './script/dashboard'

  export default {
    name: 'dashboard',
    data () {
      return {
        usersLoaded: false,
        users: []
      }
    },
    created () {
      this.loadUsers()
    },
    methods: {
      loadUsers () {
        dashboard.loadUsers().then(response => {
          this.usersLoaded = true
          this.users = response.data.Users
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
