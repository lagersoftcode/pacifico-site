<template>
  <section class="noMatch section">
    <div class="row">
      <div class="col-sm-4 col-sm-offset-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2>Content Not Found :(</h2>
          </div>
          <div class="panel-body">
            <a href="#" v-on:click="goBack">Go Back</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'noMatch',
  data () {
    return {
      error: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .noMatch {
    margin-top: 10rem;
    text-align: center;
  }
</style>
