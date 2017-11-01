<template>
  <div v-if="show">
    <div class="layout-padding">
      <h3 class="text-bold text-tertiary">Choose which aisles to add to your store:</h3>
      <q-card :id="aisle.category_id"
              @click="getT2Categories(aisle.category_id)"
              class="bg-light cursor-pointer text-tertiary text-bold"
              inline style="padding: 10px"
              v-for="(aisle, key) in T1Aisles"
              :key="key">
        {{aisle.name}}
      </q-card>
      <br><br><br>
      <h3 class="text-bold text-tertiary">Choose which product categories to add to your aisles:</h3>

      <div v-for="(aisle, key) in T2Aisles" :key="key">
        <q-card :id="t2.category_id"
                cursor-pointer
                @click="selectT2Categories(t2.category_id)"
                class="bg-light text-tertiary text-bold cursor-pointer "
                inline style="padding: 10px"
                v-for="(t2, key2) in aisle"
                :key="key2">
          {{t2.name}}
        </q-card>
        <hr>
      </div>
      <q-btn @click="addTemplateCategories">Save</q-btn>
      <!--<div class="panel panel-default">-->
        <!--<div class="panel-heading categories_header">-->
          <!--<q-field icon="business">-->
            <!--<q-input type="text"-->
                     <!--v-model="new_category_name"-->
                     <!--placeholder="Category Name"-->
                     <!--@keyup.enter="addCategory()"-->
                     <!--:after="[{icon: 'add', handler () {addCategory()}}]" />-->
          <!--</q-field>-->
        <!--</div>-->
      <!--</div>-->
      <!--<br>-->
      <!--<div v-if="categories.length > 0" class="panel-body">-->
        <!--<q-list no-border>-->
          <!--<draggable v-model="categories" @end="categoriesReorder">-->
            <!--<transition-group name="list-complete">-->
              <!--<div separator v-for="(category, cindex) in categories" :key="cindex">-->
                <!--<q-item separator v-show="category.edit">-->
                  <!--<q-field v-show="category.edit">-->
                    <!--<q-input type="text"-->
                             <!--v-show="category.edit"-->
                             <!--v-model="old_category_name"-->
                             <!--placeholder="Enter Category Name"-->
                             <!--autofocus-->
                             <!--@keyup.enter="updateCategory(cindex)"-->
                    <!--/>-->
                  <!--</q-field>-->
                <!--</q-item>-->

                <!--<q-item separator v-show="!category.edit">-->
                  <!--<q-item-main class="text-bold">{{ category.name }}</q-item-main>-->
                  <!--<q-item-side class="group">-->
                    <!--<q-btn small icon="mode_edit" outline @click="prepCategoryUpdateState(cindex)">Edit</q-btn>-->
                    <!--<q-btn small icon="add_box" outline color="primary" class="text-primary" @click="$refs.basicModal.open(); openProducts(cindex)">-->
                      <!--<q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">-->
                        <!--Add Products in Category-->
                      <!--</q-tooltip>-->
                      <!--Products-->
                    <!--</q-btn>-->
                    <!--<q-icon name="delete" class="text-negative" v-on:click="removeCategory(cindex)"/>-->
                  <!--</q-item-side>-->
                <!--</q-item>-->
              <!--</div>-->
            <!--</transition-group>-->
          <!--</draggable>-->
        <!--</q-list>-->
        <!--<span class="text-italic">Tip: drag and drop to change category order </span><br>-->
      <!--</div>-->
      <!--<q-modal ref="basicModal" v-if="categories.length > 0" class="maximized" :content-css="{padding: '20px', minWidth: '50vw'}">-->
        <!--<h4><q-icon name="close" class="text-negative absolute-top-right" @click="$refs.basicModal.close(); updateCategory(current_category)"/></h4>-->
        <!--<modal :current_category="categories[current_category]"></modal>-->
        <!--<br><br>-->
        <!--<q-btn color="primary" @click="$refs.basicModal.close(); updateCategory(current_category)">Close</q-btn>-->
      <!--</q-modal>-->
    </div>
  </div>
</template>


<script>
import { Alert } from 'quasar'
import draggable from 'vuedraggable'
import modal from './ProductAddModal.vue'
import shop from '../../../api/shop'
import axios from 'axios'
import { mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      categories2: [],
      current_category: 0,
      step: 1,
      active: 1,
      firststep: true,
      nextStep: '',
      lastStep: '',
      laststep: false,
      new_category_name: '',
      old_category_name: '',
      new_category_i_name: '',
      show: true
    }
  },
  components: {
    draggable,
    modal
  },
  methods: {
    ...mapActions([
      'getT1Aisles'
    ]),
    ...mapMutations([
      'enableT1Aisle',
      'enableDisableT2'
    ]),
    getT1Categories () {
      shop.templateCategoriesT1().then(response => {
        this.T1Aisles = response.data
      })
    },
    getT2Categories (id) {
      this.enableT1Aisle(id)
      this.enableDisableT2(id)
      let index = this.template_category_ids.indexOf(id)
      if (index > -1) {
        document.getElementById(id).classList.remove('bg-light')
        document.getElementById(id).classList.add('bg-primary')
        document.getElementById(id).classList.remove('text-tertiary')
        document.getElementById(id).classList.add('text-white')
      }
      else {
        document.getElementById(id).classList.remove('bg-primary')
        document.getElementById(id).classList.add('bg-light')
        document.getElementById(id).classList.remove('text-white')
        document.getElementById(id).classList.add('text-tertiary')
      }
    },
    selectT2Categories (id) {
      if (document.getElementById(id).classList.contains('bg-light')) {
        document.getElementById(id).classList.remove('bg-light')
        document.getElementById(id).classList.add('bg-tertiary')
        document.getElementById(id).classList.remove('text-tertiary')
        document.getElementById(id).classList.add('text-white')
        this.template_category_ids.push(id)
      }
      else {
        document.getElementById(id).classList.remove('bg-tertiary')
        document.getElementById(id).classList.add('bg-light')
        document.getElementById(id).classList.remove('text-white')
        document.getElementById(id).classList.add('text-tertiary')
        let index = this.template_category_ids.indexOfid
        if (index > -1) {
          this.template_category_ids.splice(index, 1)
        }
      }
    },
    rerender () {
      this.show = false
      this.$nextTick(() => {
        this.show = true
        console.log('re-render start')
        this.$nextTick(() => {
          console.log('re-render end')
        })
      })
    },
    removeCategory (cindex) {
      this.categories.splice(cindex, 1)
    },
    addCategory () {
      if (this.$route.path === '/admin/products') {
        shop.createCategory({
          category_id: '',
          name: this.new_category_name,
          store_id: this.selectedStore,
          sort_order: 0,
          enabled: true,
          products: []
        }).then(() => {
          this.categories.push({
            name: this.new_category_name,
            products: []
          })
        }).catch(error => {
          Alert.create({html: 'Oops :/ category creation failed.' + error.response.data})
        })
      }
      else {
        this.categories.push({
          name: this.new_category_name,
          products: [],
          edit: false
        })
        this.$store.commit('update_store', {categories: this.categories})
        this.new_category_name = ''
      }
    },
    prepCategoryUpdateState (cindex) {
      this.categories[cindex].edit = true
      this.old_category_name = this.categories[cindex].name
      this.rerender()
    },
    openProducts (cindex) {
      this.current_category = cindex
      this.old_category_name = this.categories[cindex].name
    },
    updateCategory (cindex) {
      this.categories[cindex].name = this.old_category_name
      this.$store.commit('update_store', {categories: this.categories})
      console.log('id:' + this.categories[cindex].category_id)
      if (this.$route.path === '/admin/products') {
        shop.updateCategory({
          category_id: this.categories[cindex].category_id,
          name: this.old_category_name,
          store_id: this.selectedStore,
          sort_order: 0,
          enabled: true
        }).then(() => this.rerender())
      }
      this.categories[cindex].edit = false
    },
    categoriesReorder () {
      let categoryIDs = []
      for (var i = 0; i < this.categories.length; i++) {
        categoryIDs.push(this.categories[i].category_id)
      }
      if (this.$route.path === '/admin/products') {
        shop.reorderCategories({
          category_ids: categoryIDs,
          store_id: this.selectedStore
        }).then(() => this.rerender())
      }
    },
    addTemplateCategories () {
      axios.defaults.headers.common['storeID'] = this.selectedStore
      shop.templateCategoriesAdd(
        {
          template_category_ids: this.template_category_ids
        }
      )
    }
  },
  computed: {
    categories: {
      get () { return this.$store.state.storeInfo.store.categories },
      set (value) { this.$store.commit('update_store', {categories: value}) }
    },
    T1Aisles: {
      get () { return this.$store.state.storeInfo.T1Aisles }
    },
    T2Aisles: {
      get () { return this.$store.state.storeInfo.T2Aisles }
    },
    selectedStore: {
      get () { return this.$store.state.storeInfo.selectedStore }
    },
    template_category_ids: {
      get () { return this.$store.state.storeInfo.store.category_ids }
    },
    t2Categories () {
      let tempList = []
      Object.keys(this.T2Aisles).forEach(key => {
        this.T2Aisles[key].forEach(category => {
          tempList.push(category)
        })
      })
      return tempList
    }
  },
  created () {
    this.getT1Aisles()
  }
}
</script>
<style>
  li.q-tree-item{
    border:1px solid #e0e0e0;
    margin-left: -30PX;
  }

  .categoryIcon {
    margin-left: -20px;
  }
  .item > .item-secondary {
    width: 70px;
  }
</style>
