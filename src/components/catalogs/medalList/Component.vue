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
    <div class="row">
      <span class="label label-danger">{{ loadMedalsError }}</span>
    </div>
  </div>
</template>
<script>
  import medalList from './script/medalList'
  import baseRequest from '../../../lib/baseRequest'

  export default {
    name: 'medalList',
    data () {
      return {
        loadMedalsError: '',
        medals: []
      }
    },
    created () {
      this.loadMedals()
    },
    methods: {
      loadMedals: function () {
        medalList.loadMedals().then(response => {
          this.medals = response.data.Medals
        }).catch(error => {
          this.loadMedalsError = 'Error loading medals'
          baseRequest.errorHandler(error)
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
