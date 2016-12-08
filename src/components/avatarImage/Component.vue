<template>
  <section class="user-profile section">
    <div class="">
      <svg width="100%" height="500px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">
        <image v-if="torso" v-bind:href="getImageUrl(torso.Image)" x="50%" y="0" v-bind:width="torsoWidth" v-bind:height="torsoHeight" :transform="translate(-torsoWidth/2,  headHeight -25)"/>
	      <image v-if="head" v-bind:href="getImageUrl(head.Image)" x="50%" y="0" v-bind:width="headWidth" v-bind:height="headHeight" :transform="translate(-headWidth/2, 0)"/>
	      <image v-if="leftHand" v-bind:href="getImageUrl(leftHand.Image)" x="25%" y="0" v-bind:width="handsWidth" v-bind:height="headHeight" :transform="translate(-headWidth/2, torsoHeight)"/>
      </svg>
    </div>
  </section>
</template>

<script>
  import siteConfig from '../../siteconfig'

  export default {
    name: 'avatarImage',
    props: ['head', 'torso', 'leftHand', 'rightHand'],
    data () {
      return {
        headWidth: '150',
        headHeight: '130',
        torsoWidth: '100',
        torsoHeight: '150',
        handsWidth: '50',
        handsHeight: '50'
      }
    },
    created () {
    },
    methods: {
      getImageUrl (imageName) {
        return siteConfig.STATIC_FILES_URL + imageName
      },
      translate: function (x, y) {
        return `translate(${x},${y})`
      }
    }
  }
</script>

<style scoped>
ul {
    list-style-type: none;
}

li {
    float: left;
}

</style>
