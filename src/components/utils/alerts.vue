<template>
  <div class="row">
    <div
      v-for="message in messages"
      :class="'alert alert-' + message.type"
      v-if="message.active"
      role="alert"
    >
      <strong>{{ message.type.toUpperCase() }}!</strong> {{ message.message }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'alerts',
    props: {
      messages: Object
    }
  }
</script>

<style>

</style>
