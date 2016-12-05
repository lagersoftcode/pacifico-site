<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="row">
        <form v-on:submit.prevent="changePassword" class="col-sm-8 col-sm-offset-2">
          <div class="form-group">
            <input type="text" class="form-control" name="password" id="password" value="" placeholder="Current Password" maxlength="15" v-model="password" />
          </div>
          <div class="form-group">
            <input type="text" class="form-control" name="newPassword" id="newPassword" value="" placeholder="New Password" maxlength="15" v-model="newPassword" />
          </div>
          <div class="form-group">
            <input type="confirmPasword" class="form-control" name="email" id="confirmPasword" value="" placeholder="Confirm New Password" maxlength="255" v-model="confirmPasword" />
          </div>
          <hr>
          <input type="submit" class="btn btn-primary" id="saveButton" value="Save" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  // import password from './script/password'

  export default {
    name: 'password',
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>

</style>
