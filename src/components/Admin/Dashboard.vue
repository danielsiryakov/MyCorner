<template>
  <q-layout
    ref="layoutD"
    :left-breakpoint="800"
    :view="'hHr LpR lFr'"
    :reveal="true"
    class=""
  >
    <q-toolbar inverted color="primary" class="text-tertiary" slot="header">
      <q-btn class="hide-me" flat @click="$refs.layoutD.toggleLeft()">
        <q-icon name="menu"/>
      </q-btn>
      <q-toolbar-title>
        <router-link to="/"><img src="../../assets/fullLogoDark.png" id="logo"></router-link>
        <span slot="subtitle">Empowering Your Neighborhood</span>
      </q-toolbar-title>
    </q-toolbar>


    <q-scroll-area slot="left" class="bg-light " style="width: 100%; height: 100%">
      <drawer></drawer>
    </q-scroll-area>

    <q-select
      inverted
      float-label="Which Store To Display?"
      v-model="selectedStore"
      :options="storeSelect"
      @change="getFullStoreInfo(selectedStore)"
    />

    <transition name="fade" mode="out-in">
      <router-view class="layout-view"></router-view>
    </transition>

  </q-layout>
</template>

<script>
  import drawer from './drawer.vue'
  import layoutStore from '../../store/otherJS/layout-store'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        layoutStore
      }
    },
    components: {
      drawer
    },
    methods: {
      ...mapActions([
        'getFullStoreInfo'
      ])
    },
    computed: {
      storeID: function () {
        console.log(Object.keys(this.$store.state.userInfo.info.user_roles.Access))
        return Object.keys(this.$store.state.userInfo.info.user_roles.Access)
      },
      storeSelect: function () {
        let selectOptions = []
        for (var i = 0; i < this.storeID.length; i++) {
          selectOptions.push({
            label: this.storeID[i],
            value: this.storeID[i]
          })
        }
        return selectOptions
      },
      selectedStore: {
        get () { return this.$store.state.storeInfo.selectedStore },
        set (value) { this.$store.commit('update_store_selection', value) }
      }
    },
    mounted () {
    }
  }
</script>

<style>
  #logo {
    /*background-image: url("../assets/fulllogo.png");*/
    padding-top: 0px;
    height:2.19rem;
    /* delete this property if you don't want your logo to scale down on mobile devices */
    -webkit-transorm: scale(0.8);
    -moz-transform: scale(0.8);
    -ms-transform: scale(0.8);
    -o-transform: scale(0.8);
    transform: scale(0.8);
  }

  .fade-enter-active, .fade-enter{
    -webkit-animation: moveFromRight .5s both ease;
    animation: moveFromRight .5s both ease;
  }
  .fade-leave-to, .fade-leave-active {
    -webkit-animation: moveToLeft 1s both ease;
    animation: moveToLeft 1s both ease;
  }
  @media (min-width: 800px) {
    .hide-me {
      display: none !important;
    }
  }

</style>
