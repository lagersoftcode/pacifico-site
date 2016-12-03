<template>
  <div class="row">
    <div
      v-for="message in messages"
      :class="'alert alert-' + message.type"
      v-if="message.active"
      role="alert"
    >
      <button
        type="button"
        class="close"
        aria-label="Close"
      >
        <span
          aria-hidden="true"
          v-on:click="close(message)"
        >
          &times;
        </span>
      </button>
      <strong>
        {{ message.type.toUpperCase() }}!
      </strong>
      {{ message.message }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'alerts',
    methods: {
      close (message) {
        message.active = false
      }
    },
    props: {
      messages: Object
    }
  }
</script>

<style>

</style>
