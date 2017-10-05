import Vue from 'vue'
import VueRouter from 'vue-router'

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

// import CartPage from './components/CartPage'
// import IntroPage from './components/LogInSignUp/IntroPage.vue'
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
  // mode: 'history',
  routes: [
    {path: '/',
      component: load('HomePageLayout'),
      meta: {Auth: true},
      children: [
        {path: '/home', meta: { Auth: true, name: 'home' }, component: load('HomePage')},
        {path: '/store_search', meta: { Auth: true }, component: StoresListPage},
        {path: '/cart', meta: { Auth: true }, component: load('CartPage')},
        {path: '/user/by_id/:id', meta: { Auth: true }, name: 'profile', component: load('UserProfile/Profile'), props: true}
      ]
    },
    {path: '/store/by_id/:id', meta: { Auth: true }, name: 'store', component: load('StorePage'), props: true},
    {path: '/product/by_id/:id', meta: { Auth: true }, component: load('ProductPage')},
    {path: '/store-sign-up', meta: { Auth: true }, component: load('Admin/Onboard/Store_Onboarding_Page')},
    {path: '/admin',
      component: load('Admin/Dashboard/Dashboard'),
      children: [
        {path: '/admin/store', meta: { Auth: true }, component: load('Admin/Dashboard/StoreInfo')},
        {path: '/admin/products', meta: { Auth: true }, component: load('Admin/Dashboard/ProductAndCategories')},
        {path: '/admin/payments', meta: { Auth: true }, component: load('Admin/Dashboard/StorePayments')},
        {path: '/admin/orders', meta: { Auth: true }, component: load('Admin/Dashboard/Orders')}
      ]
    },
    {
      path: '/login',
      name: 'intro',
      meta: { Auth: false },
      component: load('LogInSignUp/IntroPage')
    },
    {
      path: '/termsofuse',
      name: 'termsofuse',
      meta: { Auth: false },
      component: load('LogInSignUp/TermsOfService')
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
    if (to.path === '/') {
      next({path: '/home', replace: true})
    }
    else {
      next()
    }
  }
})

export default Router
