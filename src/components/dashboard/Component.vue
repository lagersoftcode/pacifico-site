<template>
  <section class="dashboard section">
    <div class="row">
      <h1>Dashboard</h1>
    </div>
    <hr>
    <div class="row">
      <span class="label label-info" v-if="!usersLoaded">Loading users...</span>
      <span class="label label-danger">{{ loadingDashboardError }}</span>
      <div class="col-md-4" v-for="user in users">
        <div class="panel panel-info">
          <div class="panel-heading">
            {{ user.UserName }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import dashboard from './script/dashboard'
  import baseRequest from '../../lib/baseRequest'

  export default {
    name: 'dashboard',
    data () {
      return {
        usersLoaded: false,
        loadingDashboardError: '',
        users: []
      }
    },
    created () {
      this.loadUsers()
    },
    methods: {
      loadUsers () {
        this.$Progress.start()
        dashboard.loadUsers().then(response => {
          this.usersLoaded = true
          this.users = response.data.Users
          this.$Progress.finish()
        }).catch(error => {
          this.loadingDashboardError = 'Error loading dashboard data'
          this.$Progress.fail()
          baseRequest.errorHandler(error)
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../theme/theme.scss';
</style>
