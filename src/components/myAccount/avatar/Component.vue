<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="row">
        <div class="col-sm-4">
          <avatarImage ref="avatarImage"
            v-bind:head="selectedHead"
            v-bind:torso="selectedTorso"
            v-bind:leftHand="selectedLeftHand"
            v-bind:rightHand="selectedRightHand">
          </avatarImage>
        </div>
        <div class="col-sm-8">
          <div class="panel panel-info panel-sm">
            <div class="panel-heading panel-heading-sm">
              <span>Head</span>
            </div>
            <div class="panel-body">
              <div class="horizontal-scroll">
                <ul>
                  <li v-for="head in heads">
                    <img :src="getItemImage(head.Image)" v-on:click="headSelected(head)" alt="" class="avatar-item"/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="panel panel-info panel-sm">
            <div class="panel-heading panel-heading-sm">
              <span>Torso</span>
            </div>
            <div class="panel-body">
              <div class="horizontal-scroll">
                <ul>
                  <li v-for="torso in torsos">
                    <img :src="getItemImage(torso.Image)" v-on:click="torsoSelected(torso)" alt="" class="avatar-item"/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="panel panel-info panel-sm">
            <div class="panel-heading panel-heading-sm">
              <span>Left hand</span>
            </div>
            <div class="panel-body">
              <div class="horizontal-scroll">
                <ul>
                  <li v-for="leftHand in leftHands">
                    <img :src="getItemImage(leftHand.Image)" v-on:click="handSelected(leftHand)" alt="" class="avatar-item"/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="panel panel-info panel-sm">
            <div class="panel-heading panel-heading-sm">
              <span>Right hand</span>
            </div>
            <div class="panel-body">
              <div class="horizontal-scroll">
                <ul>
                  <li v-for="rightHand in rightHands">
                    <img :src="getItemImage(rightHand.Image)" v-on:click="handSelected(rightHand)" alt="" class="avatar-item"/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import avatar from './script/avatar'
  import baseRequest from '../../../lib/baseRequest'
  import siteconfig from '../../../siteconfig'
  import avatarImage from '../../avatarImage/Component'

  Vue.component('avatarImage', avatarImage)

  export default {
    name: 'avatar',
    data () {
      return {
        selectedColor: 'WHITE',
        selectedTorso: null,
        selectedHead: null,
        selectedLeftHand: null,
        selectedRightHand: null,
        items: [],
        heads: [],
        torsos: [],
        leftHands: [],
        rightHands: []
      }
    },
    created () {
    },
    methods: {
      getItemImage: function (file) {
        return siteconfig.STATIC_FILES_URL + file
      },
      loadAvatarItems: function () {
        avatar.loadAvatarItems().then(response => {
          this.items = response.data.Items
          this.heads = this.getHeads()
          this.torsos = this.getTorsos()
          this.leftHands = this.getHands('LEFT')
          this.rightHands = this.getHands('RIGHT')
        }).catch(error => {
          baseRequest.errorHandler(error)
        })
      },
      getHeads: function () {
        return this.items.filter(item => {
          return item.Type === 'HEAD'
        })
      },
      getTorsos: function () {
        return this.items.filter(item => {
          return item.Type === 'TORSO'
        })
      },
      getHands: function (orientation) {
        return this.items.filter(item => {
          return (item.Type === 'HAND' || item.Type === 'WEAPON') && item.Orientation === orientation
        })
      },
      headSelected: function (head) {
        this.selectedHead = head
      },
      torsoSelected: function (torso) {
        this.selectedTorso = torso
      },
      handSelected: function (hand) {
        if (hand.Orientation === 'LEFT') {
          this.selectedLeftHand = hand
        } else {
          this.selectedRightHand = hand
        }
      }
    }
  }
</script>

<style scoped>
  ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
  }

  li {
      float: left;
  }

  li a {
      display: block;
      text-align: center;
      padding: 16px;
      text-decoration: none;
  }
</style>
