<template>
  <div>
    <div class="list bg-inverted-light">
      <div class="item multiple-lines" >
        <i class="item-primary text-secondary">perm_identity</i>
        <div class="item-content">
         <label class="text-primary">Enter Your Username</label>
            <input
              type="text"
              v-model="username"
              @input="$v.form.username.$touch()"
              required class="full-width"
              placeholder="Enter Username"
            >
        </div>
        <i v-show="!$v.form.username.$invalid" class="item-secondary text-green">check</i>
      </div>
      <div class="item multiple-lines">
        <i class="item-primary text-secondary">email</i>
        <div class="item-content">
           <label class="text-primary">Enter Your email</label>
            <input
              type="text"
              v-model="email"
              @input="$v.form.email.$touch()"
              required class="full-width"
              placeholder="Enter Email"
            >
        </div>
        <i v-show="!$v.form.email.$invalid" class="item-secondary text-green">check</i>
      </div>
      <div class="item multiple-lines">
        <i class="item-primary text-secondary">lock</i>
        <div class="item-content">
         <label class="text-primary">Enter Your Password</label>
            <input
              type="password"
              v-model="password"
              @input="$v.form.password.$touch()"
              required class="full-width"
              placeholder="Enter Password"
            >
        </div>
        <i v-show="!$v.form.password.$invalid" class="item-secondary text-green">check</i>
      </div>
      <div class="item multiple-lines">
        <i class="item-primary text-secondary">lock</i>
        <div class="item-content">
         <label class="text-primary">Repeat Your Password</label>
            <input
              type="password"
              v-model="form.repeatPassword"
              @input="$v.form.repeatPassword.$touch()"
              required class="full-width"
              placeholder="Repeat Password"
            >
        </div>
        <i class="item-secondary text-green" v-show="!$v.form.repeatPassword.$invalid">check</i>
      </div>
    </div>
  </div>
</template>


<script>
  import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        ready: false,
        finished: false,
        form: {
          username: '',
          email: '',
          password: '',
          repeatPassword: ''
        }
      }
    },
    validations: {
      form: {
        username: {required, minLength: minLength(6)},
        password: {required, minLength: minLength(6)},
        repeatPassword: {required, minLength: minLength(6), sameAsPassword: sameAs('password')},
        email: {required, email}
      }
    },
    computed: {
      username: {
        get () { return this.$store.state.storeInfo.user.username },
        set (value) {
          this.$store.commit('update_user', {username: value})
          this.form.username = value
        }
      },
      email: {
        get () { return this.$store.state.storeInfo.user.email },
        set (value) {
          this.$store.commit('update_user', {email: value})
          this.form.email = value
        }
      },
      password: {
        get () { return this.$store.state.storeInfo.user.password },
        set (value) {
          this.$store.commit('update_user', {password: value})
          this.form.password = value
        }
      }
    }
  }
</script>

<style>

</style>
