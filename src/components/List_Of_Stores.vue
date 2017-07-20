
<template>
  <div class="layout-view bg-light">
    <div class="layout-padding">
       <div class="row wrap group lg-gutter">
         <!--<div class="lg-width-1of3"></div>-->
          <div v-for="s in allStores" class="col-md-12 col-bg-12 col-lg-12 bg-light">
            <router-link :to="{name: 'store', params: {id: s._id}}" tag="div" @click.native="activeStore(s._id)">
              <q-card class="bigger">
                <q-card-media overlay-position="bottom">
                  <img :src="s.image" alt="" style="object-fit: cover;  width: 100vw; height: 40vh;">
                  <q-card-title slot="overlay">
                    <h4 class="text-bold">{{ s.name }}</h4>
                    <!--<q-rating slot="subtitle" v-model="stars" :max="5" />-->
                  </q-card-title>
                </q-card-media>
              </q-card>
            </router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import {
    Loading,
    QSpinnerGears
  } from 'quasar'

  export default {
    computed: {
      ...mapGetters([
        'allStores'
      ])
    },
    components: {
      QSpinnerGears
    },
    methods: {
      ...mapActions([
        'getAllStores'
      ]),
      ...mapMutations([
        'activeStore'
      ])
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      Loading.show()
      this.getAllStores()
      Loading.hide()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'getAllStores'
    },
    data () {
      return {
        stars: 4
      }
    }
  }
</script>

<style>
  /*ListOfStores.vue css*/
  .item-block {
    margin-bottom: 1.5em;
    margin-top: 1.5em;
    float: left;
  }
  #logo a span {
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left: 0;
    /* edit: added z-index */
    z-index: 1;
  }
</style>
