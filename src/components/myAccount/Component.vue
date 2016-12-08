<template>
  <section class="user-profile section">
    <div class="row">
      <div class="col-sm-3">
        <h3><span class="label label-success"> {{ userStats.UserName }} ({{ userStats.Category }}) <img class="star" :src="getImageUrl('/icons/star.png')" alt=""/> {{ userStats.Stats_TotalScore }} </span></h3>
      </div>
    </div>
    <hr>
    <div class="row">

      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
        <li role="presentation"><a href="#avatar" aria-controls="avatar" role="tab" data-toggle="tab" v-on:click="loadAvatarData">Avatar</a></li>
        <li role="presentation"><a href="#password" aria-controls="password" role="tab" data-toggle="tab">Password</a></li>
      </ul>

      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="profile">
          <profile />
        </div>
        <div role="tabpanel" class="tab-pane" id="avatar">
          <avatar ref="avatar" />
        </div>
        <div role="tabpanel" class="tab-pane" id="password">
          <password />
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import keyStorage from 'key-storage'
  import siteConfig from '../../siteconfig'
  import myAccount from './script/myAccount'
  import profile from './profile/Component'
  import password from './password/Component'
  import avatar from './avatar/Component'

  const UserId = keyStorage.get('UserId')

  export default {
    name: 'myAccount',
    data () {
      return {
        userStats: {}
      }
    },
    components: {
      profile,
      password,
      avatar
    },
    created () {
      this.$Progress.start()
      this.loadUserStats()
    },
    methods: {
      getImageUrl (imageName) {
        return siteConfig.STATIC_FILES_URL + imageName
      },
      loadUserStats () {
        myAccount.loadUserStats(UserId).then(response => {
          this.userStats = response.data
          this.$Progress.increase(25)
        })
      },
      loadAvatarData () {
        this.$refs.avatar.loadAvatarItems()
      }
    }
  }
</script>

<style scoped>

</style>
