import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLayout from './components/Admin/Dashboard/Dashboard'
import AdminStore from './components/Admin/Dashboard/StoreInfo'
import AdminCategories from './components/Admin/Dashboard/Categories'
import AdminProducts from './components/Admin/Dashboard/Products'
import AdminPayments from './components/Admin/Dashboard/StorePayments'
import AdminOrders from './components/Admin/Dashboard/Orders.vue'
import HomePageLayout from './components/HomePageLayout'
import HomePage from './components/HomePage'
import CartPage from './components/CartPage'
import Profile from './components/UserProfile/Profile'
import StorePage from './components/StorePage'
import ProductPage from './components/ProductPage'
import StoreOnboarding from './components/Admin/Onboard/Store_Onboarding_Page'
import IntroPage from './components/LogInSignUp/IntroPage'
import PrivacyPage from './components/LogInSignUp/Privacy'
import TermsOfService from './components/LogInSignUp/TermsOfService'

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

import StoresListPage from './components/List_Of_Stores'
import store from './store/index'
Vue.use(VueRouter)

const Router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/',
      component: HomePageLayout,
      meta: { Auth: true },
      children: [
        {path: 'home', meta: { Auth: false }, name: 'home', component: HomePage},
        {path: 'store_search', meta: { Auth: false }, component: StoresListPage},
        {path: 'cart', meta: { Auth: false }, component: CartPage},
        {path: 'user/by_id/:id', meta: { Auth: false }, name: 'profile', component: Profile, props: true}
      ]
    },
    {path: '/store/by_id/:id', meta: { Auth: false }, name: 'store', component: StorePage, props: true},
    {path: '/product/by_id/:id', meta: { Auth: false }, component: ProductPage},
    {path: '/store-sign-up', meta: { Auth: true }, component: StoreOnboarding},
    {path: '/admin',
      component: AdminLayout,
      meta: { Auth: true },
      name: 'admin',
      children: [
        {path: 'store', meta: { Auth: true }, component: AdminStore},
        {path: 'categories', meta: { Auth: true }, component: AdminCategories},
        {path: 'products', meta: { Auth: true }, component: AdminProducts},
        {path: 'payments', meta: { Auth: true }, component: AdminPayments},
        {path: 'orders', meta: { Auth: true }, component: AdminOrders}
      ]
    },
    {
      path: '/login',
      name: 'intro',
      meta: { Auth: false },
      component: IntroPage
    },
    {
      path: '/termsofuse',
      name: 'termsofuse',
      meta: { Auth: false },
      component: TermsOfService
    },
    {
      path: '/privacy',
      name: 'privacy',
      meta: { Auth: false },
      component: PrivacyPage
    },
    {path: '*', component: load('Error404')}]
})

Router.beforeEach((to, from, next) => {
  // store.dispatch('checkAuth')
  if (to.meta.Auth === true && store.state.auth.authenticated === false) {
    console.log('authentication is: ' + store.state.auth.authenticated)
    next({path: '/login'})
  }
  else {
    if (to.path === '/') {
      next({path: '/home', replace: true})
    }
    else if (to.path === '/admin') {
      next({path: '/admin/orders', replace: true})
    }
    else if (to.path === '/login' && store.state.auth.authenticated === true) {
      console.log('is store owner: ' + store.state.userInfo.info.is_store_owner)
      if (store.state.userInfo.info.is_store_owner === true) {
        next({path: '/admin/orders', replace: true})
      }
      else {
        next({path: '/home', replace: true})
      }
    }
    else {
      next()
    }
  }
})

export default Router
