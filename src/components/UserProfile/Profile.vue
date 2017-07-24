<template>
    <div class="layout-view">
      <div class ="layout-padding">
        <div class="row justify-center">
          <div class="col-lg-8">
            <h4 class="text-bold">Your User Info!</h4>
            <q-list highlight>
              <q-list-header>{{ user.email }}</q-list-header>
              <q-item v-for="(item,key) in user" :key="key">
                {{ key }} - {{ item }}
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ])
    },
    mounted () {
      this.getUserInfo()
    }
  }
</script>

<style></style>
