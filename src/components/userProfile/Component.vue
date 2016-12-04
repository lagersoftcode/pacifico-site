<template>
  <section class="user-profile section">
    <div class="row">
      <h1>{{ $route.params.userName }} profile</h1>
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-4">
        <img class="profile-pic-big img-responsive center-block" :src="getImageUrl('icons/def-profile.png')" alt=""/>
      </div>
      <div class="col-sm-8">
        <div class="panel panel-info">
          <div class="panel-heading">
            Trophies
          </div>
          <div class="panel-body">
            <div class="trophy-list">
              <table>
                <tbody>
                <tr>
                  <td class="trophy-td" v-for="trophy in trophies">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <span class="trophy-name">{{ trophy.Name }}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img class="trophy-image" :src="trophy.Image" :title="trophy.Description" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item-text">{{ new Date(trophy.CreatedAt).toLocaleString() }}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item-text">Given by {{ trophy.GivenBy }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="panel panel-warning">
          <div class="panel-heading">
            Medals
          </div>
          <div class="panel-body">
            <div class="medal-list">
              <table>
                <tbody>
                <tr>
                  <td class="medal-td" v-for="medal in medals">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <span class="medal-name">{{ medal.Name }}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img class="medal-image" :src="medal.Image" :title="medal.Description" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item-text">{{ new Date(medal.CreatedAt).toLocaleString() }}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item-text">Given by {{ medal.GivenBy }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            Last kudos
          </div>
          <div class="panel-body">
            <div class="kudo-list">
              <table>
                <tbody>
                <tr>
                  <td class="kudo-td" v-for="kudo in lastKudos">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <img class="kudo-image" :src="getImageUrl('icons/kudo.png')" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item-text">{{ new Date(kudo.CreatedAt).toLocaleString() }}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="kudo-given-by">{{ kudo.GivenBy }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import siteConfig from '../../siteconfig'
  import userProfile from './script/userProfile'

  export default {
    name: 'userProfile',
    data () {
      return {
        trophies: [],
        medals: [],
        lastKudos: []
      }
    },
    created () {
      this.loadTrophies()
      this.loadMedals()
      this.loadLastKudos()
    },
    methods: {
      getImageUrl (imageName) {
        return siteConfig.STATIC_FILES_URL + imageName
      },
      loadTrophies () {
        userProfile.loadTrophies(this.$route.params.userId).then(response => {
          this.trophies = response.data.Transactions
        })
      },
      loadMedals () {
        userProfile.loadMedals(this.$route.params.userId).then(response => {
          this.medals = response.data.Transactions
        })
      },
      loadLastKudos () {
        userProfile.loadLastKudos(this.$route.params.userId).then(response => {
          this.lastKudos = response.data.Transactions
        })
      }
    }
  }
</script>

<style scoped>

</style>
