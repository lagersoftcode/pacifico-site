<template>
  <section class="dashboard section">
    <div class="row">
      <h1>Dashboard</h1>
    </div>
    <div class="row">
      <alerts :messages="resultMessages" />
    </div>
    <last-actions v-bind:eventHandler="eventHandler"></last-actions>
    <hr>
    <div class="row">
      <span class="label label-info" v-if="!usersLoaded">Loading users...</span>
      <span class="label label-danger">{{ loadingDashboardError }}</span>
      <div class="col-md-4" v-for="user in users">
        <div class="panel panel-info">
          <div class="panel-heading">
            <span class="username">{{ user.UserName }}</span>
            <span><img class="star" :src="getImageUrl('icons/star.png')" alt=""/></span>
            <span class="label label-primary">{{ user.Stats_TotalScore }}</span>
          </div>
          <div class="panel-body">
            <div class="col-sm-6">
              <img class="profile-pic" :src="getImageUrl('icons/def-profile.png')" alt=""/>
            </div>
            <div class="col-sm-5">
              <table>
                <tbody>
                  <tr>
                    <td class="stats-td">
                      <img class="stat-icon" :src="getImageUrl('icons/trophy.png')" alt="" />
                    </td>
                    <td class="stats-td">
                      <span>{{ user.Stats_TotalTrophies }}</span>
                    </td>
                    <td class="stats-td">
                      <img class="stat-icon" :src="getImageUrl('icons/medal.png')" alt="" />
                    </td>
                    <td class="stats-td">
                      <span>{{ user.Stats_TotalMedals }}</span>
                    </td>
                    <td class="stats-td">
                      <img class="stat-icon" :src="getImageUrl('icons/kudo.png')" alt="" />
                    </td>
                    <td class="stats-td">
                      <span >{{ user.Stats_TotalKudos }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <span style="margin-top:10px">This is my description in case I want to say some words to the world</span>
              </div>
            </div>
          </div>
          <div class="panel-footer clearfix">
            <div class="col-sm-4">
              <input type="button" class="btn btn-warning btn-xs" name="name" value="View profile">
            </div>
            <div class="col-sm-4">
              <input type="button" class="btn btn-primary btn-xs" name="name" value="Give a kudo!" v-on:click="giveKudo(user)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  import dashboard from './script/dashboard'
  import baseRequest from '../../lib/baseRequest'
  import siteConfig from '../../siteconfig'
  import LastActions from './lastActions/Component'

  Vue.component('last-actions', LastActions)

  var eventHandler = new Vue()

  export default {
    name: 'dashboard',
    data () {
      return {
        usersLoaded: false,
        loadingDashboardError: '',
        users: [],
        staticFilesUrl: siteConfig.STATIC_FILES_URL,
        resultMessages: dashboard.resultMessages(),
        eventHandler: eventHandler
      }
    },
    created () {
      this.loadUsers()
    },
    methods: {
      getImageUrl (imageName) {
        return siteConfig.STATIC_FILES_URL + imageName
      },
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
      },
      giveKudo (user) {
        this.$Progress.start()
        dashboard.giveKudo({userId: user.ID}).then(response => {
          this.$Progress.finish()
          this.resultMessages.KudoSuccess.active = true
          user.Stats_TotalKudos += 1
          this.eventHandler.$emit('action-added')
        }).catch(error => {
          console.log(error)
          this.$Progress.fail()
          if (error.response.status === 406) {
            this.resultMessages.KudoLimit.active = true
          } else {
            this.resultMessages.KudoError.active = true
          }
          baseRequest.errorHandler(error)
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '../theme/theme.scss'
</style>
