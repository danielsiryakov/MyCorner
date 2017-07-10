
<template>
  <div class="layout-view">
    <div class="layout-padding">
       <div class="row wrap group lg-gutter">
         <!--<div class="lg-width-1of3"></div>-->
          <div v-for="s in allStores" class="col-12 md-col-12 bg-col-12 lg-col-4 bg-light">
            <router-link :to="{name: 'store', params: {id: s._id}}" tag="div" v-bind:style="{ background: 'url(' + s.image + ') !important', backgroundSize: 'cover'}">
              <div class="card layout-padding" >
                <h4 class="text-bold text-tertiary">{{ s.name }}</h4>
                  <p class="float-left">
                    {{ s.address2 }} <br>
                    {{ s.address1 }} <br>
                  </p>
                  <q-rating v-model="stars" :max="5" class="vertical-middle"></q-rating>
              </div>
            </router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'allStores'
      ])
    },
    methods: {
      ...mapActions([
        'getAllStores'
      ])
    },
    mounted () {
      this.getAllStores()
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
