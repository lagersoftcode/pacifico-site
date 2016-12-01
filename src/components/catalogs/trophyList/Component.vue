<template>
  <div class="dashboard">
    <div class="row">
      <h1>Trophies</h1>
    </div>
    <hr>
    <div class="class row">
      <div class="col-sm-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trophy in trophies">
              <td><img :src="trophy.Image" class="trophy-image" alt=""></td>
              <td>{{ trophy.Name }}</td>
              <td>{{ trophy.Description }}</td>
              <td>{{ trophy.ScoreAmount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <alerts :messages="resultMessages" />
  </div>
</template>
<script>
  import trophyList from './script/trophyList'
  import baseRequest from '../../../lib/baseRequest'

  export default {
    name: 'trophyList',
    data () {
      return {
        resultMessages: trophyList.resultMessages(),
        trophies: []
      }
    },
    created () {
      this.loadTrophies()
    },
    methods: {
      loadTrophies: function () {
        this.$Progress.start()
        trophyList.resultMessages()
        trophyList.loadTrophies().then(response => {
          this.trophies = response.data.Trophies
          this.$Progress.finish()
        }).catch(error => {
          this.resultMessages.ERROR.active = true
          baseRequest.errorHandler(error)
          this.$Progress.fail()
        })
      }
    }
  }
</script>

<style scoped>
  .trophy-image {
    max-width: 80px;
  }
</style>
