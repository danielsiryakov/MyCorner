<template>
  <div class="layout-view">

    <section class="flex window-height" id="corner">
      <div class="sm-width-1of1 md-width-1of1 bg-width-5of5 lg-width-3of5">
        <img src="../../assets/fulllogo.png" class="mobile-only" style="padding: 20px;height: 100px">
        <img src="../../assets/fulllogo.png" class="desktop-only" style="width: 30vw">

        <div class="row centered justify-center group" id="footer" style="padding: 20px;">
          <div class="col-lg-8">
            <div class="blur-container mobile-only">
              <q-carousel arrows dots class="bgimgico mobile-only text-white">
                <div slot="slide" class="" align="center">
                  <h5 class="text-blur text-bold">Search for stores around your corner!</h5>
                  <img src="../../assets/icons/storeSearch.svg" alt="Online Grocery Shopping" height="135px">
                </div>
                <div slot="slide" class="" align="center">
                  <h5 class="text-blur text-bold">Add your favorite items to your cart!</h5>
                  <img src="../../assets/icons/addProducts.svg" alt="Online Grocery Shopping" height="135px">
                </div>
                <div slot="slide" class="" align="center">
                  <h5 class="text-blur text-bold">Have it delivered straight to your home!</h5>
                  <img src="../../assets/icons/groceryDelivered.svg" alt="Online Grocery Shopping" height="135px">
                </div>
              </q-carousel>
            </div>
          </div>
        </div>
        <q-modal ref="logInSignUp" transition="fade" :content-css="{maxWidth: '800px',maxHeight: '800px'}">
          <h4><q-icon name="close" class="text-primary absolute-top-right" @click="$refs.logInSignUp.close()"/></h4>
          <!--<h4><q-icon class="text-primary float-right" style="padding-right: 20px" @click="$refs.logInSignUp.close()" name="close"/></h4>-->
          <br><br>
          <div class="">
            <q-tabs :refs="$refs" v-model="formTab" no-pane-border color="tertiary">
              <q-tab slot="title" name="login" label="log in"/>
              <q-tab slot="title" name="signup" label="Sign Up" />

              <q-tab-pane name="login"><login @closeModal="$refs.logInSignUp.close()"></login></q-tab-pane>
              <q-tab-pane  name="signup"><sign-up v-if="!signedup" v-on:submit="signedup = true"></sign-up>
                <div v-if="signedup" style="padding: 20px;" class="layout-padding">
                  <h4>we sent you a confirmation email!</h4><br>
                  <big class="text-tertiary">
                    Confirm your email address and start shopping for everything you love!
                  </big>
                </div>
              </q-tab-pane>
            </q-tabs>
          </div>
        </q-modal>
        <div class="desktop-only row justify-center group" id="footer" style="padding-bottom: 20px;">
          <div class="col-lg-8">
            <div class="row justify-center group">
              <q-btn big color="primary" class="text-bold text-primary col-4" style="font-size: 25px;" @click="formTab='signup', $refs.logInSignUp.open()">
                Sign Up Today!
              </q-btn>
            </div>
          </div>
        </div>
        <div class="mobile-only row justify-center group" id="footer" style="padding-bottom: 20px;">
          <div class="col-lg-8">
            <div class="row justify-center group">
              <q-btn big color="primary" class="col-5" @click="formTab='login', $refs.logInSignUp.open()">Login</q-btn>
              <q-btn big color="primary" class="col-5" @click="formTab='signup', $refs.logInSignUp.open()">Sign Up</q-btn>
            </div>
          </div>
        </div>
      </div>
      <!--a class="bottom_left" href="https://www.trevormitchellartist.com/">Image courtesy of Trevor Mitchell</a-->
    </section>

    <section align="center" class="window-height bg-light desktop-only" id="what-we-do" style="padding-top: 6%; padding-bottom: 7%; padding-left: 3%; padding-right: 3%; min-height: 750px;">
      <h2 class="text-primary">Shop on MyCorner!</h2>
      <h5 class="text-grey-6">Shopping has never been simpler. Find all your favorite items right around the corner and have them delivered to you in minutes!</h5><br><br><br>
      <q-card class="bg-grey-1" align="center" style="width: 27%;" inline>
        <q-card-title align="left">
          <h4 class="float-left text-bold text-primary">1.</h4><br>
        </q-card-title>
        <q-card-media>
          <img style="width: 35%;" class="card_icons" src="../../assets/icons/storeSearch.svg" alt="All your favorite stores at your fingertips">
        </q-card-media>
        <br><br>
        <q-card-separator />
        <q-card-title>
            Search
            <span slot="subtitle">
              <div style="overflow-y:scroll; overflow-x:hidden; max-height:35px;">
                Search for all your favorite stores right around your corner and step inside.
              </div>
            </span>
        </q-card-title>
      </q-card>
      <q-card class="bg-grey-1" align="center" style="width: 27%" inline>
        <q-card-title align="left">
          <h4 class="float-left text-bold text-primary">2.</h4><br>
        </q-card-title>
        <q-card-media>
          <img style="width: 35%;" class="card_icons" src="../../assets/icons/addProducts.svg" alt="Add your favorite items to your cart and checkout with the click of a button">
        </q-card-media>
        <br><br>
        <q-card-separator />
        <q-card-title>
            Shop
            <span slot="subtitle">
              <div style="overflow-y:scroll; overflow-x:hidden; max-height:35px;">
                Add items to your carts as you shop and checkout with the click of a button.
              </div>
            </span>
        </q-card-title>
      </q-card>
      <q-card class="bg-grey-1" align="center" style="width: 27%" inline>
        <q-card-title align="left">
          <h4 class="float-left text-bold text-primary">3.</h4><br>
        </q-card-title>
        <q-card-media>
          <img style="width: 35%;" src="../../assets/icons/groceryDelivered.svg" alt="Online Grocery Shopping" >
        </q-card-media>
        <br><br>
        <q-card-separator />
        <q-card-title>
          Enjoy
          <span slot="subtitle">
            <div style="overflow-y:scroll; overflow-x:hidden; max-height:35px;">
              Have your items delivered straight to your home or pick them up without waiting on a single line!
            </div>
          </span>
        </q-card-title>
      </q-card>
    </section>
    <q-modal maximized ref="trialInfo" transition="fade">
      <h4><q-icon name="close" class="text-primary absolute-top-right" @click="$refs.trialInfo.close()"/></h4>
      <trial-period></trial-period>
    </q-modal>

    <section class="layout-padding window-height bg-grey-1 row no-wrap desktop-only" id="partners" style="padding-top: 5%; padding-bottom: 5%; min-height: 750px;">
      <div align="center" style="padding:30px; padding-top: 70px;">
        <h3 class="text-primary">Are you a local merchant?</h3><br>
        <q-btn color="primary" big @click="$refs.trialInfo.open()">Start your free trial today!</q-btn>
      </div>
      <q-carousel arrows dots class="bgimgico text-grey-9">
        <div slot="slide" class="" align="center">
          <img src="../../assets/admin-store.png" alt="MyCorner.Store" style="width: 400px;"><br><br>
          <div>
            Managing your online store has never been easier!
            MyCorner allows you to easily manage your store information with one simple form.
            From setting your store hours, to updating your delivery fees, we strive to make this process as enjoyable as possible.
          </div>
        </div>
        <div slot="slide" class="" align="center">
          <img src="../../assets/admin-products.png" alt="MyCorner.Store" style="width: 400px;"><br><br>
          <div>
            We have painstakingly hand crafted our custom store template to make uploading your inventory as simple as dragging an item into your store.
            Most of our items come with nutrition facts and details so you don't have to wory about any data entry.
            We currently have over 140 categories and 18 thousand items in our ever growing catalog!
          </div>
        </div>
        <div slot="slide" class="" align="center">
          <img src="../../assets/store_product_list_view.png" alt="MyCorner.Store" style="width: 400px"><br><br>
          <div>
            Don't have time to go through all your items? That's ok. Save your progress and come back any time! Wanna know the best part?
            Your progress is automatically visible to your customers so they don't waste a second shopping for their favorite goods at their favorite store.
          </div>
        </div>
      </q-carousel>
    </section>

    <section class="layout-padding window-height bg-light row no-wrap desktop-only" id="partners" style="padding-top: 5%; padding-bottom: 5%; min-height: 750px;">
      <q-carousel arrows dots class="bgimgico text-grey-9">
        <div slot="slide" class="" align="center">
          <img src="../../assets/store_search.png" alt="MyCorner.Store" style="width: 400px;"><br><br>
          <div>
            Take a walk around the block and see what's on your corner. Our selection of stores is constantly growing.
            Haven't found what your looking for? We would love nothing more then for you to tell your favorite store about us or contact us with your suggestions.
          </div>
        </div>
        <div slot="slide" class="" align="center">
          <img src="../../assets/store_product_list_view.png" alt="MyCorner.Store" style="width: 400px;"><br><br>
          <div>
            Walk the aisles and add items to your cart.
          </div>
        </div>
        <div slot="slide" class="" align="center">
          <img src="../../assets/store_item_details.png" alt="MyCorner.Store" style="width: 400px"><br><br>
          <div>
            Still not sure if you found what your looking for?
            No worries, we take pride in our inventory and do our very best to provide you with details and nutrition facts.
            If it dosen't feel like your holding the items in the palm of your hands we haven't done our job.
          </div>
        </div>
        <div slot="slide" class="" align="center">
          <img src="../../assets/store_cart.png" alt="MyCorner.Store" style="width: 400px"><br><br>
          <div>
            Checkout is as easy as clicking a button!
          </div>
        </div>
      </q-carousel>
      <div align="center" style="padding:30px; padding-top: 70px;">
        <h3 class="text-primary">Looking to do some shopping?</h3><br>
        <q-btn color="primary" big @click="$refs.logInSignUp.open()">Sign Up, it's free!</q-btn>
      </div>
    </section>

    <section class="layout-padding window-height desktop-only" id="contact" align="center" style="min-height: 750px;">
      <h2 class="text-white text-bold">
        CONTACT US
        <h6 class="text-light-green-3">
          From our team here at MyCorner, we sincerly hope to be a part of your shopping experience.
          If you have questions, concerns, feedback, suggestions or requests we are here to help in any way we can.
        </h6>
      </h2>
      <div class="absolute-center" style="padding: 40px; padding-left: 20%; padding-right: 20%;">
        <q-field icon="email" type="email" label="Email" helper="Required" dark><q-input dark v-model="contactUsEmail" /></q-field>
        <q-field icon="phone" label="Phone" type="tel" helper="Optional" dark><q-input dark v-model="contactUsPhoneNumber" /></q-field>
        <q-field icon="person" label="Name" helper="Optional" dark><q-input dark v-model="contactUsName" /></q-field>
        <q-field icon="mail" label="Message" :count="500" helper="Required" dark>
          <q-input dark type="textarea" v-model="contactUsMessage" :max-height="100" :min-rows="4" />
        </q-field>
      </div>
      <q-btn big color="primary" class="text-bold text-primary col-4" style="font-size: 25px;">
        Send
      </q-btn>
    </section>

  </div>
</template>

<script>
  import Login from './Login.vue'
  import TrialPeriod from './TrialPeriodOffer.vue'
  import SignUp from './Signup.vue'
  import {
    QTabs, QRouteTab, QBtn, QIcon
  } from 'quasar'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        formTab: 'login',
        signedup: false,
        contactUsEmail: '',
        contactUsPhoneNumber: '',
        contactUsName: '',
        contactUsMessage: ''
      }
    },
    components: {
      Login,
      SignUp,
      TrialPeriod,
      QTabs,
      QRouteTab,
      QBtn,
      QIcon
    },
    computed: mapState({
      userAuth: 'authenticated'
    }),
    methods: {
      modalClosed () {
        console.log('modal closed')
      }
    }
  }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  section#contact {
    background-color: rgba(0, 50, 0, 0.95);
    background-image: url("../../assets/map-image.png") !important;
    background-repeat: no-repeat;
    background-position: center;
  }
  #corner {
    background-image: url("../../assets/img/groceryStoreCartoon.jpg");
    height: 50%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .landing_pg_sections {
    padding: 100px 0;
    height: 100%;
  }
  .bottom_left {
    position:absolute;
    bottom: 0;
    left:0;
  }
  .glow_logo_mobile {
    width: 40%;
    height: 12%;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow:
      0 0 60px 30px rgba(0, 0, 0, 0.3),
      0 0 100px 60px rgba(0, 0, 0, 0.2),
      0 0 140px 90px rgba(0, 0, 0, 0.5);
  }
  #footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .blur-container{
    width: 280px;
    height: 330px;
    background: inherit;
    position: absolute;
    overflow: hidden;
    top: 61%;
    left: 59%;
    margin-left: -175px;
    margin-top: -112%;
    border-radius: 8px;
  }
  .blur-container:before{
    width: 400px;
    height: 550px;
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    background: inherit;
    box-shadow: inset 0 0 0 200px rgba(0, 0, 0, 0.62);
    filter: blur(10px);
  }
  .bimgico{
    width: 120px;
    height: 120px;
    border-radius: 100%;
  }
  .text-blur{
    background: 0;
    width: 200px;
    outline: 0;
    border: 0;
    border-bottom: 2px solid rgba(255,255,255, 0.3);
    margin: 20px 0;
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(255,255,255, 1);
  }
  round-border {
    border-radius: 200px !important;
  }
</style>
