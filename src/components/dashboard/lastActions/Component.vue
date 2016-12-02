<template>
  <section class="dashboard section">
    <div class="row">
      <h4>Last actions</h4>
      <span class="label label-info" v-if="!lastActionsLoaded">Loading lastActions...</span>
      <div class="col-md-12 last-action" v-for="action in lastActions">
        <span>{{ new Date(action.CreatedAt).toLocaleString() }} : </span>
        <span> <strong>{{ action.TargetUser }} </strong> </span><span> received a </span>
        <span> {{ action.Item }} <img class="log-icon" :src="getIcon(action.Item)" alt="" /></span>
        <span> from </span><span> {{ action.SourceUser }} </span>
      </div>
    </div>
  </section>
</template>

<script>
  import lastActions from './script/lastActions'
  import siteConfig from '../../../siteconfig'

  export default {
    name: 'getLastActions',
    data () {
      return {
        lastActionsLoaded: false,
        lastActions: [],
        staticFilesUrl: siteConfig.STATIC_FILES_URL
      }
    },
    created () {
      this.loadLastActions()
    },
    methods: {
      getIcon (item) {
        switch (item) {
          case 'Medal':
            return siteConfig.STATIC_FILES_URL + 'icons/medal.png'
          case 'Trophy':
            return siteConfig.STATIC_FILES_URL + 'icons/trophy.png'
          case 'Kudo':
            return siteConfig.STATIC_FILES_URL + 'icons/kudo.png'
        }
      },
      loadLastActions () {
        lastActions.loadLastActions().then(response => {
          this.lastActionsLoaded = true
          this.lastActions = response.data.LastActions
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
</style>
