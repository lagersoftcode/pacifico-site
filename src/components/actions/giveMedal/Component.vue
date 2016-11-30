<template>
  <div class="dashboard">
    <div class="row">
      <h1>Give Medal</h1>
    </div>
    <hr>
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="col-sm-4">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="username" v-on:keyup="userInput" v-model="username">
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="medal" v-on:keyup="medalInput" v-model="medal">
            </div>
          </div>
          <div class="col-sm-2">
            <div class="form-group">
              <input type="button" class="btn btn-info" value="Give" v-on:click="saveGivenMedal">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <ul class="list-group">
              <li class="list-group-item clickable-item" v-for="user in filteredUsers" v-on:click="userSelected(user)">{{ user.UserName }}</li>
            </ul>
          </div>
          <div class="col-sm-4">
            <ul class="list-group">
              <li class="list-group-item clickable-item" v-for="medal in filteredMedals" v-on:click="medalSelected(medal)">{{ medal.Name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <span class="label label-danger">{{ giveMedalError }}</span>
      <span class="label label-success">{{ successMessage }}</span>
    </div>
  </div>
</template>
<script>
  import giveMedal from './script/giveMedal'
  import baseRequest from '../../../lib/baseRequest'

  export default {
    name: 'giveMedal',
    data () {
      return {
        username: '',
        giveMedalError: '',
        users: [],
        filteredUsers: [],
        medals: [],
        filteredMedals: [],
        selectedUser: null,
        selectedMedal: null
      }
    },
    created () {
      giveMedal.loadUsers().then(response => {
        this.users = response.data.Users
      }).catch(error => {
        console.log(error)
      })

      giveMedal.loadMedals().then(response => {
        this.medals = response.data.Medals
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      userInput: function () {
        if (this.username.length > 0) {
          this.filteredUsers = this.users.filter(user => {
            return user.UserName.toLowerCase().indexOf(this.username.toLowerCase()) > -1
          })
        }
      },
      medalInput: function () {
        if (this.medal.length > 0) {
          this.filteredMedals = this.medals.filter(medal => {
            return medal.Name.toLowerCase().indexOf(this.medal.toLowerCase()) > -1
          })
        }
      },
      userSelected: function (user) {
        this.username = user.UserName
        this.selectedUser = user
        this.filteredUsers = []
      },
      medalSelected: function (medal) {
        this.medal = medal.Name
        this.selectedMedal = medal
        this.filteredMedals = []
      },
      saveGivenMedal: function () {
        if (!this.selectedUser || !this.selectedMedal) {
          this.giveMedalError = 'Please select user and medal'
          return
        }

        this.$Progress.start()

        let data = { userId: this.selectedUser.ID, medalId: this.selectedMedal.ID }
        let error = giveMedal.validateForm(data)
        if (error.length > 0) {
          this.$Progress.fail()
          this.giveMedalError = error
        } else {
          this.giveMedalError = ''
          giveMedal.saveGivenMedal(data).then(response => {
            this.$Progress.finish()
            this.username = ''
            this.medal = ''
            this.selectedUser = null
            this.selectedMedal = null
            this.successMessage = 'Medal was given! :)'
          }).catch(error => {
            this.giveMedalError = 'Error giving medal :('
            baseRequest.errorHandler(error)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .clickable-item {
    cursor: pointer;
  }
</style>
