<template>
  <div class="layout-view">

    <section class="flex window-height" id="corner">
      <!-- A Toolbar with a title and subtitle -->
      <q-toolbar color="primary" inverted class="light-dimmed absolute-top-right desktop-only" style="height: 8%; background: rgba(0, 0, 0, 0.01);">
          <q-toolbar-title>
            <img src="../../assets/fulllogo.png"
                 class="desktop-only absolute-top-left"
                 style="max-width: 90%; max-height: 90%; z-index: 99; padding-left: 30px; padding-top: 5px;">
          </q-toolbar-title>
          <q-btn style="padding: 10px; z-index: 99;" @click="$refs.commonQuestions.open()">
            <q-icon style="z-index: 99;" name="question answer" />
            <span big class="text-bold" style="z-index: 99;">Q & A</span>
          </q-btn>
          <q-btn style="padding: 10px; z-index: 99;" @click="$refs.trialInfo.open()">
            <q-icon small style="z-index: 99;" name="monetization on" />
            <span class="text-bold" style="z-index: 99;">Trial</span>
          </q-btn>
          <q-btn style="padding: 10px; z-index: 99;" @click="$refs.logInSignUp.open()">
            <q-icon small style="z-index: 99;" name="lock open" />
            <span class="text-bold" style="z-index: 99;">Login</span>
          </q-btn>
      </q-toolbar>

      <div class="sm-width-1of1 md-width-1of1 bg-width-5of5 lg-width-3of5">
        <img src="../../assets/fulllogo.png" class="mobile-only" style="padding: 20px;height: 100px">
        <q-toolbar color="primary" inverted class="mobile-only absolute-center full-width" style="width: 100vw !important;">
          <!--<q-toolbar color="">-->
          <vue-google-autocomplete
            id="map2"
            ref="addressSearch2"
            placeholder="Enter Your Address To Find Stores Near You"
            v-on:placechanged="getLocation"
            country="usa"
            :enableGeolocation="true"
            class="locationSearch full-width"
          >
            <!--<q-input></q-input>-->
          </vue-google-autocomplete>
          <!--<q-search icon="location_on" :debounce="0" inverted color="primary light" v-model="searchValue" @enter="searchForStores"></q-search>-->
          <!--</q-toolbar/>-->
        </q-toolbar>
        <!--<div class="row centered justify-center group" id="footer" style="padding: 20px;">-->
          <!--<div class="col-lg-8">-->
            <!--<div class="blur-container mobile-only">-->
              <!--<q-carousel arrows dots class="bgimgico mobile-only text-white">-->
                <!--<div slot="slide" class="" align="center">-->
                  <!--<h5 class="text-blur text-bold">Search for stores around your corner!</h5>-->
                  <!--<img src="../../assets/icons/storeSearch.svg" alt="Online Grocery Shopping" height="135px">-->
                <!--</div>-->
                <!--<div slot="slide" class="" align="center">-->
                  <!--<h5 class="text-blur text-bold">Add your favorite items to your cart!</h5>-->
                  <!--<img src="../../assets/icons/addProducts.svg" alt="Online Grocery Shopping" height="135px">-->
                <!--</div>-->
                <!--<div slot="slide" class="" align="center">-->
                  <!--<h5 class="text-blur text-bold">Have it delivered straight to your home!</h5>-->
                  <!--<img src="../../assets/icons/groceryDelivered.svg" alt="Online Grocery Shopping" height="135px">-->
                <!--</div>-->
              <!--</q-carousel>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

        <q-modal ref="logInSignUp" transition="fade" :content-css="{maxWidth: '800px',maxHeight: '800px'}">
          <h4><q-icon name="close" class="text-primary absolute-top-right" @click="$refs.logInSignUp.close()"/></h4>
          <!--<h4><q-icon class="text-primary float-right" style="padding-right: 20px" @click="$refs.logInSignUp.close()" name="close"/></h4>-->
          <br><br>
          <div class="">
            <q-tabs :refs="$refs" v-model="formTab" no-pane-border color="tertiary">
              <q-tab slot="title" name="login" label="log in"/>
              <q-tab slot="title" name="signup" label="Sign Up" />

              <q-tab-pane name="login"><login @closeModal="$refs.logInSignUp.close()"></login></q-tab-pane>
              <q-tab-pane  name="signup"><sign-up :formTab="'user'" v-if="!signedup" v-on:submit="signedup = true"></sign-up>
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
        <div class="row desktop-only absolute-center group" style="width: 50vw">
          <q-toolbar color="primary" class="full-width">
            <!--<q-toolbar color="">-->
              <vue-google-autocomplete
                id="map"
                ref="addressSearch"
                placeholder="Enter Your Address To Find Stores Near You"
                v-on:placechanged="getLocation"
                country="usa"
                :enableGeolocation="true"
                class="locationSearch full-width"
              >
                <!--<q-input></q-input>-->
              </vue-google-autocomplete>
              <!--<q-search icon="location_on" :debounce="0" inverted color="primary light" v-model="searchValue" @enter="searchForStores"></q-search>-->
            <!--</q-toolbar/>-->
          </q-toolbar>
        </div>
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
    </section>

    <section align="center" class="layout-padding bg-light desktop-only" id="what-we-do">
      <h2 class="text-primary">Shop on MyCorner!</h2>
      <h5 class="text-tertiary">Shopping has never been simpler. Find all your favorite items right around the corner and have them delivered within the hour!</h5><br><br>
      <div class="row no-wrap">
        <q-card class="col bg-grey-1" align="center" inline>
          <q-card-title align="left">
            <h4 class="float-left text-bold text-tertiary">1.</h4><br>
          </q-card-title>
          <q-card-media>
            <img style="width: 10vw" class="card_icons" src="../../assets/icons/storeSearch.svg" alt="All your favorite stores at your fingertips">
          </q-card-media>
          <br><br>
          <q-card-separator />
          <q-card-title>
            <h5 class="text-bold text-tertiary">Search</h5>
            <span slot="subtitle">
              <div>
                Search for all your favorite stores right around your corner and step inside.
              </div>
            </span>
          </q-card-title>
        </q-card>
        <q-card class="col bg-grey-1" align="center" inline>
          <q-card-title align="left">
            <h4 class="float-left text-bold text-tertiary">2.</h4><br>
          </q-card-title>
          <q-card-media>
            <img style="width: 10vw;" class="card_icons" src="../../assets/icons/addProducts.svg" alt="Add your favorite items to your cart and checkout with the click of a button">
          </q-card-media>
          <br><br>
          <q-card-separator />
          <q-card-title>
            <h5 class="text-bold text-tertiary">Shop</h5>
            <span slot="subtitle">
              <div>
                Add items to your carts as you shop and checkout with the click of a button.
              </div>
            </span>
          </q-card-title>
        </q-card>
        <q-card class="col bg-grey-1" align="center" inline>
          <q-card-title align="left">
            <h4 class="float-left text-bold text-tertiary">3.</h4><br>
          </q-card-title>
          <q-card-media>
            <img style="width: 10vw;" src="../../assets/icons/groceryDelivered.svg" alt="Online Grocery Shopping" >
          </q-card-media>
          <br><br>
          <q-card-separator />
          <q-card-title>
            <h5 class="text-bold text-tertiary">Enjoy</h5>
            <span slot="subtitle">
            <div>
              Have your items delivered straight to your home or pick them up without waiting on a single line!
            </div>
          </span>
          </q-card-title>
        </q-card>
      </div>
    </section>
    <q-modal maximized ref="trialInfo" transition="fade">
      <h4><q-icon name="close" class="text-primary absolute-top-right" @click="$refs.trialInfo.close()"/></h4>
      <trial-period></trial-period>
    </q-modal>
    <q-modal maximized ref="commonQuestions" transition="fade">
      <h4><q-icon name="close" class="text-primary absolute-top-right" @click="$refs.commonQuestions.close()"/></h4>
      <common-questions></common-questions>
    </q-modal>

    <section class="layout-padding justify-center bg-grey-3 row desktop-only" id="partners" style="min-height: 850px;">
      <div align="center" style="">
        <h3 class="text-primary">Are you a local merchant?</h3><br>
        <q-btn color="primary" big @click="$refs.trialInfo.open()">Start Your Free Trial!</q-btn>
      </div>
      <q-carousel arrows dots class="text-grey-9">
        <div slot="slide" class="" align="center">
          <br><img src="../../assets/admin-store.png" alt="MyCorner.Store" style="width: 400px;"><br><br>
          <h5 class="text-bold text-tertiary">Managing your online store has never been easier!</h5>
          <div>
            MyCorner allows you to easily manage your store information with one simple form.
            From setting your store hours, to updating your delivery fees, we strive to make this process as enjoyable as possible.
          </div>
        </div>
        <div slot="slide" class="" align="center">
          <br><img src="../../assets/admin-products.png" alt="MyCorner.Store" style="width: 400px;"><br><br>
          <h5 class="text-bold text-tertiary">Quickly upload your inventory</h5>
          <div>
            We have painstakingly hand crafted our custom store template to make uploading your inventory as simple as dragging an item into your store.
            Most of our items come with nutrition facts and details so you don't have to wory about any data entry.
            We currently have over 140 categories and 18 thousand items in our ever growing catalog!
          </div>
        </div>
        <div slot="slide" class="" align="center">
          <img src="../../assets/store_product_list_view.png" alt="MyCorner.Store" style="width: 400px"><br><br>
          <h5 class="text-bold text-tertiary">Work at your own pace</h5>
          <div>
            Don't have time to go through all your items? That's ok. Save your progress and come back any time! Wanna know the best part?
            Your progress is automatically visible to your customers so they don't waste a second shopping for their favorite goods at their favorite store.
          </div>
        </div>
      </q-carousel>
    </section>

    <section class="layout-padding justify-center bg-light row desktop-only" id="partners" style="min-height: 750px;">
      <div align="center" style="padding:30px; padding-top: 70px;">
        <h3 class="text-primary">Looking to do some shopping?</h3><br>
        <q-btn color="primary" big @click="$refs.logInSignUp.open()">Sign Up, it's free!</q-btn>
      </div>
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

    </section>

    <section class="layout-padding bg-grey-3 window-height desktop-only" id="contact" align="center" style="min-height: 750px;">
      <h2 class="text-primary">
        CONTACT US <br>
        <h6 class="text-tertiary">
          From our team here at MyCorner, we sincerly hope to be a part of your shopping experience.
          If you have questions, concerns, feedback, suggestions or requests we are here to help in any way we can.
        </h6>
      </h2>
      <div class="text-tertiary center" style="padding: 40px; padding-left: 20%; padding-right: 20%;">
        <q-field class="text-tertiary" icon="email" type="email" label="Email" helper="Required">
          <q-input placeholder="Enter your email address"
                   v-model="contactUsEmail"
                   color="tertiary"
                   class="text-tertiary"
                   inverted/>
        </q-field>
        <q-field class="text-tertiary" icon="phone" label="Phone" type="tel" helper="Optional">
          <q-input placeholder="Enter your email phone number"
                   class="text-tertiary"
                   v-model="contactUsPhoneNumber"
                   color="tertiary"
                   inverted/>
        </q-field>
        <q-field class="text-tertiary" color="tertiary" icon="person" label="Name" helper="Optional">
          <q-input placeholder="Enter your name"
                   class="text-tertiary"
                   v-model="contactUsName"
                   color="tertiary"
                   inverted />
        </q-field>
        <q-field icon="mail" label="Message" :count="500" helper="Required">
          <q-input placeholder="Enter your email message"
                   color="tertiary"
                   inverted
                   type="textarea"
                   v-model="contactUsMessage"
                   :max-height="100"
                   :min-rows="4" />
        </q-field>
      </div>
      <q-btn big color="primary"
             class="text-bold text-primary col-4"
             @click="sendEmail" style="font-size: 25px;">
        Send
      </q-btn>
      <a href="https://www.facebook.com/MyCorner.Store1/" target="_blank">
        <img src="../../assets/icons/facebook.png" alt="" class="fixed-bottom-right" style="height: 50px; padding: 5px">
      </a>
    </section>

  </div>
</template>

<script>
  import Login from './Login.vue'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import TrialPeriod from './TrialPeriodOffer.vue'
  import CommonQuestions from './CommonQuestions.vue'
  // import axios from 'axios'
  import shop from '../../api/shop'
  // const ADDRESS_BOOK_ADD = shop.API_URL + 'user/address_book/add'
  import SignUp from './Signup.vue'
  import {
    QTabs, QRouteTab, QBtn, QIcon, Toast
  } from 'quasar'
  import { mapState, mapActions, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        formTab: 'login',
        signedup: false,
        contactUsEmail: '',
        contactUsPhoneNumber: '',
        contactUsName: '',
        contactUsMessage: '',
        address: '',
        address2: ''
      }
    },
    components: {
      Login,
      SignUp,
      TrialPeriod,
      QTabs,
      QRouteTab,
      QBtn,
      QIcon,
      CommonQuestions,
      VueGoogleAutocomplete
    },
    computed: mapState({
      userAuth: 'authenticated'
    }),
    methods: {
      ...mapActions([
        'logout',
        'searchForStores',
        'getAllStores',
        'addUserAddress'
      ]),
      ...mapMutations([
        'setDefaultAddress',
        'formattedAddress'
      ]),
      sendEmail () {
        shop.sendEmail({
          to: 'daniel@mycorner.store',
          body: this.contactUsMessage,
          subject: 'MyCorner ContactUS - ' + this.contactUsEmail + ' - ' + this.contactUsPhoneNumber
        }).then(response => {
          Toast.create({
            html: 'Message sent! Thank you for your feedback :)'
          })
          this.contactUsEmail = ''
          this.contactUsPhoneNumber = ''
          this.contactUsName = ''
          this.contactUsMessage = ''
          console.log(response)
        })
      },
      modalClosed () {
        console.log('modal closed')
      },
      getLocation (addressData, placeResultData) {
        console.log(placeResultData)
        this.address = addressData
//        this.addUserAddress(JSON.stringify(addressData))
        this.address2 = placeResultData
        this.setDefaultAddress(addressData)
//        this.getAllStores()
        this.formattedAddress(placeResultData)
        this.$refs.addressSearch.clear()
        this.searchForStores()
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
    /*background-color: rgba(0, 50, 0, 0.95);*/
    /*background-image: url("../../assets/map-image.png") !important;*/
    /*background-repeat: no-repeat;*/
    /*background-position: center;*/
  }
  #corner {
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.16)), url("../../assets/img/groceryStoreCartoon.jpg");
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
  .locationSearch {
    -webkit-appearance: none;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: none;
    border-radius: 4px;
    box-shadow: none;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1rem;
    height: 3em;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    line-height: 1.5;
    padding-left: .75em;
    padding-right: .75em;
    position: relative;
    vertical-align: top;
    background-color: #fff;
    border: 1px solid #40dba1;
    color: #000000;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    width: 100%;
  }
  locationSearch:focus {
    border: 1px solid #40dba1;
  }
</style>
