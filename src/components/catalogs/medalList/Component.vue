<template>
  <div class="dashboard">
    <div class="row">
      <h1>Medals</h1>
    </div>
    <hr>
    <div class="class row">
      <div class="col-sm-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Material</th>
              <th>Description</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="medal in medals">
              <td><img :src="medal.Image" class="medal-image" alt=""></td>
              <td>{{ medal.Name }}</td>
              <td>{{ medal.Material }}</td>
              <td>{{ medal.Description }}</td>
              <td>{{ medal.ScoreAmount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <alerts :messages="resultMessages" />
  </div>
</template>
<script>
  import medalList from './script/medalList'
  import baseRequest from '../../../lib/baseRequest'

  export default {
    name: 'medalList',
    data () {
      return {
        resultMessages: medalList.resultMessages(),
        medals: []
      }
    },
    created () {
      this.loadMedals()
    },
    methods: {
      loadMedals: function () {
        medalList.resultMessages()
        this.$Progress.start()
        medalList.loadMedals().then(response => {
          this.medals = response.data.Medals
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
  .medal-image {
    max-width: 80px;
  }
</style>
