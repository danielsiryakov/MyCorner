
<template>
  <div class=" layout-padding bg-light">
    <div class="">
       <div class="row wrap group justify-center">
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
          <div v-for="s in allStores" class="col-md-12 col-bg-10 col-lg-8 bg-light">
            <router-link :to="{name: 'store', params: {id: s.store_id}}" tag="div" @click.native="activeStore(s.store_id)" v-if="s.store_id">
              <q-card class="bigger">
                <q-card-media overlay-position="bottom">
                  <img v-if="s.image" class="dimmed" :src="s.image" alt="" style="object-fit: cover;  width: 100vw; height: 40vh;">
                  <img v-if="!s.image" class="dimmed" src="../assets/fulllogo.png" alt="" style="object-fit: contain;  width: 100vw; height: 40vh;">
                  <q-card-title slot="overlay">
                    <h4 class="text-bold" v-if="s.delivery">{{ s.name }}
                      <q-chip v-if="s.delivery.service_offered == true" small color="amber-9">Offers Delivery</q-chip>
                    </h4>
                    {{ Math.round(s.distance * 100) / 100 }} miles
                    <small><span class="text-light text-bold float-right">{{ formattedPrice(s.delivery.delivery_minimum) }} min <big>&#x22C5</big> {{ formattedPrice(s.delivery.delivery_fee) }} fee</span></small>
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
      ]),
      formattedPrice (itemTotal) {
        return (itemTotal / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
      }
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
