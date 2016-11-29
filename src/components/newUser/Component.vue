<template>
  <div class="new-user section">
    <div class="row">
      <h1>Add New User</h1>
    </div>
    <hr>
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="col-sm-8 col-sm-offset-2">
            <input type="text" class="form-control" name="username" id="username" value="" placeholder="Username" maxlength="15" v-model="username">
            <input type="text" class="form-control" name="firstname" id="firstname" value="" placeholder="First Name" maxlength="30" v-model="lastname">
            <input type="text" class="form-control" name="lastname" id="lastname" value="" placeholder="Last Name" maxlength="30" v-model="lastname">
            <input type="email" class="form-control" name="email" id="email" value="" placeholder="E-mail" maxlength="255" v-model="email">
            <hr>
            <input type="button" class="btn btn-primary" id="saveButton" value="Save" >
            <div>
                <span class="label label-danger">{{ error }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newUser',
  data () {
    return {
      error: ''
    }
  },
  methods: {}
}
</script>

<style scoped>
  .panel {
    border-top-width: 1px;
  }
</style>
