<template>
  <div class="dashboard">
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
  import baseRequest from '../../lib/baseRequest'

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
          baseRequest.errorHandler(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
