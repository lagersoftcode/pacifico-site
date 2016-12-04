<template>
  <section class="dashboard section">
    <div class="row">
      <h1>Dashboard</h1>
    </div>
    <div class="row">
      <alerts :messages="resultMessages" />
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-2">
        <input type="text" class="form-control" placeholder="search username" v-model="userSearch" v-on:keyup.enter="loadUsers(1)">
      </div>
    </div>
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
            <div class="row">
              <div class="col-sm-6">
                <img class="profile-pic img-responsive center-block" :src="getImageUrl('icons/def-profile.png')" alt=""/>
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
          </div>
          <div class="panel-footer clearfix">
            <div class="row">
              <div class="col-sm-4 col-xs-6">
                <input type="button" class="btn btn-warning btn-xs" name="name" value="View profile">
              </div>
              <div class="col-sm-4 col-xs-6">
                <input type="button" class="btn btn-primary btn-xs" name="name" value="Give a kudo!" v-on:click="giveKudo(user)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li v-if="currentPage > 1">
            <a href="#" aria-label="Previous" v-on:click="loadUsers(1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li><a href="#" v-for="n in totalPages" v-on:click="loadUsers(n)">{{n}}</a></li>
          <li v-if="currentPage < totalPages">
            <a href="#" aria-label="Next" v-on:click="loadUsers(totalPages)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <hr>
    <last-actions v-bind:eventHandler="eventHandler"></last-actions>
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
        userSearch: '',
        staticFilesUrl: siteConfig.STATIC_FILES_URL,
        resultMessages: dashboard.resultMessages(),
        totalPages: 2,
        currentPage: 1,
        eventHandler: eventHandler
      }
    },
    created () {
      this.loadUsers(1)
    },
    methods: {
      getImageUrl (imageName) {
        return siteConfig.STATIC_FILES_URL + imageName
      },
      loadUsers (page) {
        this.$Progress.start()
        dashboard.loadUsers(page, this.userSearch).then(response => {
          this.usersLoaded = true
          this.users = response.data.Users
          this.currentPage = response.data.CurrentPage
          this.totalPages = response.data.TotalPages
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
