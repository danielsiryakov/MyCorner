<template>
  <q-layout>
    <q-toolbar color="tertiary" class="text-white">
      <q-btn v-go-back="'/'" icon="arrow_back"/>
      <q-toolbar-title>User Profile</q-toolbar-title>
    </q-toolbar>
    <div class="layout-view">
      <div class ="layout-padding">
        <div class="row justify-center">
          <div class="col-lg-8">
            <h4 class="text-bold">Your User Info!</h4>
            <q-list highlight>
              <q-list-header>{{ user.email }}</q-list-header>
              <q-item v-for="(item,key) in user">
                {{ key }} - {{ item }}
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
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
