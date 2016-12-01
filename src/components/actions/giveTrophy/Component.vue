<template>
  <div class="dashboard">
    <div class="row">
      <h1>Give Trophy</h1>
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
              <input type="text" class="form-control" placeholder="trophy" v-on:keyup="trophyInput" v-model="trophy">
            </div>
          </div>
          <div class="col-sm-2">
            <div class="form-group">
              <input type="button" class="btn btn-info" value="Give" v-on:click="saveGivenTrophy">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <ul class="list-group">
              <li class="list-group-item user-item" v-for="user in filteredUsers" v-on:click="userSelected(user)">{{ user.UserName }}</li>
            </ul>
          </div>
          <div class="col-sm-4">
            <ul class="list-group">
              <li class="list-group-item user-item" v-for="trophy in filteredTrophies" v-on:click="trophySelected(trophy)">{{ trophy.Name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <alerts :resultMessages="resultMessages" />
  </div>
</template>
<script>
  import giveTrophy from './script/giveTrophy'
  import baseRequest from '../../../lib/baseRequest'
  import alerts from '../../utils/alerts'

  export default {
    name: 'giveTrophy',
    data () {
      return {
        username: '',
        giveTrophyError: '',
        users: [],
        filteredUsers: [],
        trophies: [],
        filteredTrophies: [],
        selectedUser: null,
        selectedTrophy: null,
        resultMessages: giveTrophy.resultMessages()
      }
    },
    components: {
      alerts
    },
    created () {
      giveTrophy.loadUsers().then(response => {
        this.users = response.data.Users
      }).catch(error => {
        console.log(error)
      })

      giveTrophy.loadTrophies().then(response => {
        this.trophies = response.data.Trophies
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      userInput: function (event) {
        if (this.username.length > 0) {
          this.filteredUsers = this.users.filter(user => {
            return user.UserName.toLowerCase().indexOf(this.username.toLowerCase()) > -1
          })
        }
      },
      trophyInput: function (event) {
        if (this.trophy.length > 0) {
          this.filteredTrophies = this.trophies.filter(trophy => {
            return trophy.Name.toLowerCase().indexOf(this.trophy.toLowerCase()) > -1
          })
        }
      },
      userSelected: function (user) {
        this.username = user.UserName
        this.selectedUser = user
        this.filteredUsers = []
      },
      trophySelected: function (trophy) {
        this.trophy = trophy.Name
        this.selectedTrophy = trophy
        this.filteredTrophies = []
      },
      saveGivenTrophy: function () {
        this.resultMessages = giveTrophy.resultMessages()

        if (!this.selectedUser || !this.selectedTrophy) {
          this.resultMessages.IMPUT_ERROR.active = true
          return
        }

        this.$Progress.start()

        let data = { userId: this.selectedUser.ID, trophyId: this.selectedTrophy.ID }
        let error = giveTrophy.validateForm(data)
        if (error.length > 0) {
          this.$Progress.fail()
          this.resultMessages.FORM_ERROR.message = error
          this.resultMessages.FORM_ERROR.active = true
        } else {
          giveTrophy.saveGivenTrophy(data).then(response => {
            this.$Progress.finish()
            this.username = ''
            this.trophy = ''
            this.selectedUser = null
            this.selectedTrophy = null
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
  .user-item {
    cursor: pointer;
  }
</style>
