<template>
  <div class="group" style="padding: 20px">
    <h3>Log In</h3><br>
    <p>Log in to your account and access your corner!</p><br>
    <q-input v-model="email" type="email" float-label="Enter Your Email" suffix="@email.com" clearable />
    <br>
    <q-input v-model="password" type="password" float-label="Enter Your Password" clearable />
   <br>
    <q-btn color="primary" @click="submitLogIn">Log In</q-btn>
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
        email: ''
      }
    },
    components: {
      QInput,
      QBtn
    },
    methods: {
      ...mapActions([
        'login',
        'retrieve'
      ]),
      submitLogIn () {
        this.login(
          {
            'password': this.password,
            'email': this.email
          })
//        this.retrieve()
      }
    }
  }
</script>
