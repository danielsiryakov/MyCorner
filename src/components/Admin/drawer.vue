<template>
  <div class="group">
    <q-side-link item to="/admin/products">
      <q-item-side icon="shopping_cart" color="white"/>
      <q-item-main label="Orders"/>
    </q-side-link>
    <q-side-link item to="/admin/store">
      <q-item-side icon="store" color="white"/>
      <q-item-main label="Store Info"/>
    </q-side-link>
    <q-side-link item to="/admin/products">
      <q-item-side icon="motorcycle" color="white"/>
      <q-item-main label="Products"/>
    </q-side-link>
    <q-side-link item :to="{path: '/store-sign-up', exact: true}">
      <q-item-side icon="dashboard" color="white"/>
      <q-item-main label="Create New Store"/>
    </q-side-link>
    <q-side-link item to="/admin/products">
      <q-item-side icon="attach_money" color="white"/>
      <q-item-main label="Payments"/>
    </q-side-link>
      <!--<img src="../../../dist/statics/logoIcon.ico" style='height: 80px' class="inline-block">-->
      <!--img src="../img/avatar-1.svg" id="avatar" class="inline-block"-->
      <!--<div id="user-name">-->
        <!--<span class="text-white"> {{ name }} </span>-->
        <!--<hr>-->
        <!--<span class="text-white"> {{ email }} </span>-->
        <!--<hr>-->
      <!--</div>-->
      <!--<div id="user-actions">-->
        <!--<button class="bordered blue small" ><i>person</i></button>-->
        <!--<button class="bordered blue small" ><i>lock</i></button>-->
        <!--<button class="bordered blue small" @click='logOut'><i>exit_to_app</i></button>-->
      <!--</div>-->
    <!--</div>-->
    <!--<menu-one v-if="getMenuCollapse" :links="links"></menu-one>-->
    <!--<menu-two v-else :links="links"></menu-two>-->
  </div>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        photo: '',
        userId: '',
        name: '',
        email: '',
        user: {}
      }
    },
    created () {
//      var vm = this
//      firebase.auth().onAuthStateChanged(function (user) {
//        if (user) {
//          vm.user = user
//          vm.name = vm.user.displayName
//          vm.email = vm.user.email
//          vm.photo = vm.user.photoURL
//          vm.userId = vm.user.uid
//        }
//      }/
    },
    methods: {
      logOut () {
//        firebase.auth().signOut()
      }
    },
    computed: {
      ...mapGetters(['getLayoutNeeded', 'getMenuCollapse'])
    },
    components: {
//      menuOne,
//      menuTwo
    }
  }
</script>
<style scoped>
  .fixed-bottom {
    margin-bottom: 1%;
  }
  .fixed-bottom a img {
    width: 25px;
    height: 25px;
  }
  #avatar{
    padding: 20px;
  }
  #profile {
    height: 130px;
    background-color: #009688;
  }
  #user-name {
    left: 90px;
    bottom: 77px;
    position: relative;
    width: 159px;
  }
  #user-actions {
    left: 90px;
    bottom: 71px;
    position: relative;
    width: 171px;
  }
  #menu-collapse {
    margin-top: 5%;
  }
</style>
