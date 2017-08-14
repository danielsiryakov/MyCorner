import Vue from 'vue'
import VueRouter from 'vue-router'

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

// import CartPage from './components/CartPage'
// import IntroPage from './components/IntroPage.vue'
// import HomePage from './components/HomePage'
// import ProductPage from './components/ProductPage'
import StoresListPage from './components/List_Of_Stores'
// import StorePage from './components/StorePage'
// import ProfilePage from './components/UserProfile/Profile.vue'
// import StoreOnboard from './components/Admin/Onboard/Store_Onboarding_Page.vue'
// import Dashboard from './components/Admin/Dashboard.vue'
// import { Cookies } from 'quasar'
import store from './store/index'
Vue.use(VueRouter)

const Router = new VueRouter({
  routes: [
    {path: '/',
      component: load('HomePage'),
      meta: {Auth: true, name: 'home'},
      children: [
        {path: '/store_search', meta: { Auth: true }, component: StoresListPage},
        {path: '/cart', component: load('CartPage')},
        {path: '/user/:id', meta: { Auth: true }, name: 'profile', component: load('UserProfile/Profile'), props: true}
      ]
    },
    {path: '/store/:id', name: 'store', component: load('StorePage'), props: true},
    {path: '/product/:id', component: load('ProductPage')},
    {path: '/store-sign-up', component: load('Admin/Onboard/Store_Onboarding_Page')},
    {path: '/admin',
      component: load('Admin/Dashboard'),
      children: [
        {path: '/admin/store', component: load('Admin/StoreInfo')},
        {path: '/admin/products', component: load('Admin/ProductView')}
      ]
    },
    {
      path: '/login',
      name: 'intro',
      meta: { Auth: false },
      component: load('LogInSignUp/IntroPage')
    },
    {path: '*', component: load('Error404')}]
})
// var jwt = Cookies.get('authtoken')
//
Router.beforeEach((to, from, next) => {
  store.commit('checkAuth')
  if (to.meta.Auth && !store.state.auth.authenticated) {
    next({path: '/login', replace: true})
  }
  else {
    next()
  }
})

export default Router
