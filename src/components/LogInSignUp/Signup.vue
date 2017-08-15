<template>
  <div class="group" style="padding: 0px">
    <h3>Sign Up</h3><br>
    Are you a user or store owner?
    <q-tabs :refs="$refs" v-model="formTab" no-pane-border color="white" >
      <q-tab default slot="title" name="user" label="User" class="text-tertiary text-bold"/>
      <q-tab slot="title" name="owner" @click="this.is_store_owner = true" label="Store Owner"class="text-tertiary text-bold" />

      <!--<q-tab-pane name="login"><login></login></q-tab-pane>-->
      <!--<q-tab-pane v-if="!signedup" name="signup"><sign-up v-on:submit="signedup = true"></sign-up></q-tab-pane>-->
    </q-tabs>

    <p>Signup and join YOUR corner!
      Groceries, wine, and more!</p>
    <br>
    <q-input v-model="email" type="email" stack-label="Enter Your Email" clearable name="email"/>
    <q-input v-model="password" type="password" stack-label="Enter Your password" clearable @keyup.enter="submit"/>
    <br>
    <q-btn loader color="primary" @click="submit">Sign Up</q-btn>
    <img class="float-right" src="../../assets/basket.png" alt="" width="150px" height="150px">
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import {
    QInput, QBtn
  } from 'quasar'
  export default {
    data () {
      return {
        password: '',
        email: '',
        is_store_owner: false,
        formTab: 'login'
      }
    },
    components: {
      QInput, QBtn
    },
    methods: {
      ...mapActions([
        'signup'
      ]),
      submit () {
        if (this.formTab === 'owner') { this.is_store_owner = true }
        this.signup(
          {
            'password': this.password,
            'email': this.email,
            'is_store_owner': this.is_store_owner
          })
        this.$emit('submit')
      }
    }
  }
</script>
