
<template>
  <div class=" layout-padding xbg-light">
    <div class="">
       <div class="row wrap group">
         <!--<div class="lg-width-1of3"></div>-->
         <div v-if="currentAddress == ''">
           <h4 class="text-bold text-tertiary">Where are you? Please type in your address or enable geolocation!</h4>
           <p>Everything is around your corner...we just need to know which one that is</p>
         </div>
         <div v-if="currentAddress != ''">
           <div v-if="allStores.length ==0">
             <h4>Oh no! looks like there are no stores near you :/</h4>
             <p>Tell your favorite store to sign up! MyCorner empowers your neighborhood,
               allows you to shop local, and have your favorite items from your favorite store
             delivered within an hour!</p>
           </div>
         </div>
          <div v-for="s in allStores" class="col-md-12 col-bg-12 col-lg-12 bg-light">
            <router-link :to="{name: 'store', params: {id: s.store_id}}" tag="div" @click.native="activeStore(s.store_id)">
              <q-card class="bigger">
                <q-card-media overlay-position="bottom">
                  <img class="dimmed" :src="s.image" alt="" style="object-fit: cover;  width: 100vw; height: 40vh;">
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
  export default {
    computed: {
      ...mapGetters([
        'allStores'
      ]),
      currentAddress: {
        get () { return this.$store.state.storeSearch.address }
      }
    },
    components: {
    },
    methods: {
      ...mapActions([
        'getAllStores',
        'getUserInfo'
      ]),
      ...mapMutations([
        'activeStore'
      ])
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      console.log('getallstores didnt start yet')
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
