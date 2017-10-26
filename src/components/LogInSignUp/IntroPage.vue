<template>
  <div class="layout-view" id="corner">
    <div class="flex window-height">
      <div class="sm-width-1of1 md-width-1of1 bg-width-5of5 lg-width-3of5">
        <img src="../../assets/fulllogo.png" style="padding: 20px;height: 100px">

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
        <div class="">
        <br><br>
        <div class="row no-wrap desktop-only" style="padding: 0px;">
          <q-card class="round-border" align="center" style="padding: 20px; box-shadow: inset 0 0 0 200px rgba(0, 0, 0, 0.52)">
            <h4 class="float-left text-bold text-primary">1.</h4><br>
            <h5 class="text-white text-bold">Search for stores on your corner!</h5>
            <img src="../../assets/icons/storeSearch.svg" alt="Online Grocery Shopping" height="200px">
          </q-card>
          <q-card class="round-border" align="center" style="padding: 20px; box-shadow: inset 0 0 0 200px rgba(0, 0, 0, 0.52)">
            <h4 class="float-left text-bold text-primary">2.</h4><br>
            <h5 class="text-white text-bold">Add your favorite items to your cart!</h5>
            <img src="../../assets/icons/addProducts.svg" alt="Online Grocery Shopping" height="200px">
          </q-card>
          <q-card class="round-border" align="center" style="padding: 20px; box-shadow: inset 0 0 0 200px rgba(0, 0, 0, 0.52)">
            <h4 class="float-left text-bold text-primary">3.</h4><br>
            <h5 class="text-white text-bold">Have it delivered straight to your home!</h5>
            <img src="../../assets/icons/groceryDelivered.svg" alt="Online Grocery Shopping" height="200px">
          </q-card>
        </div>
        </div>
        <q-modal ref="logInSignUp"  transition="fade" :content-css="{maxWidth: '500px'}">
          <h4><q-icon class="text-primary float-left" style="padding-left: 20px" @click="$refs.logInSignUp.close()" name="close"/></h4>
          <br><br>
          <div class="">
            <q-tabs :refs="$refs" v-model="formTab" no-pane-border color="tertiary">
              <q-tab slot="title" name="login" label="log in"/>
              <q-tab slot="title" name="signup" label="Sign Up" />

              <q-tab-pane name="login"><login @closeModal="$refs.logInSignUp.close()"></login></q-tab-pane>
              <q-tab-pane  name="signup"><sign-up v-if="!signedup" v-on:submit="signedup = true"></sign-up>
                <div v-if="signedup" style="padding: 20px;">
                  <h4>we sent you a confirmation email!</h4><br>
                  <big class="text-tertiary">
                    Confirm your email address and start shopping for everything you love!
                  </big>
                </div>
              </q-tab-pane>
            </q-tabs>
          </div>
        </q-modal>
          <div class="row justify-center group" id="footer" style="padding: 20px;">
            <div class="col-lg-8">
              <div class="row justify-center group">
                <q-btn big color="primary" outline class="bg-light col-5" @click="formTab='login', $refs.logInSignUp.open()">Login</q-btn>
                <q-btn big color="primary"  outline class="bg-light  col-5" @click="formTab='signup', $refs.logInSignUp.open()">Sign Up</q-btn>
              </div>
            </div>
          </div>
      </div>
    </div>
    <a href="https://www.trevormitchellartist.com/">Image courtesy of Trevor Mitchell</a>
  </div>
</template>

<script>
  import Login from './Login.vue'
  import SignUp from './Signup.vue'
  import {
    QTabs, QRouteTab, QBtn, QIcon
  } from 'quasar'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        formTab: 'login',
        signedup: false
      }
    },
    components: {
      Login,
      SignUp,
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
  #corner {
    background-image: url("../../assets/CornerShop.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
  #footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  #middle {
    position: fixed;
    bottom: 50px;
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
    border-radius: 20px !important;
  }
</style>
