<template>
  <div v-if="show">
    <div class="layout-padding">
      <div class="panel panel-default">
        <div class="panel-heading categories_header">
          <q-field icon="business">
            <q-input type="text"
                     v-model="new_category_name"
                     placeholder="Category Name"
                     @keyup.enter="addCategory()"
                     :after="[{icon: 'add', handler () {addCategory()}}]" />
          </q-field>
        </div>
      </div>
      <br>
      <div v-if="categories.length > 0" class="panel-body">
        <q-list no-border>
          <draggable v-model="categories" @end="categoriesReorder">
            <transition-group name="list-complete">
              <div separator v-for="(category, cindex) in categories" :key="category.name">
                <q-item separator v-show="category.edit">
                  <q-field v-show="category.edit">
                    <q-input type="text"
                             v-show="category.edit"
                             v-model="old_category_name"
                             placeholder="Enter Category Name"
                             autofocus
                             @keyup.enter="updateCategory(cindex)"
                    />
                  </q-field>
                </q-item>

                <q-item separator v-show="!category.edit">
                  <q-item-main class="text-bold">{{ category.name }}</q-item-main>
                  <q-item-side class="group">
                    <q-btn small icon="mode_edit" outline @click="prepCategoryUpdateState(cindex)">Edit</q-btn>
                    <q-btn small icon="add_box" outline color="primary" class="text-primary" @click="$refs.basicModal.open(); current_category = cindex">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                        Add Products in Category
                      </q-tooltip>
                      Products
                    </q-btn>
                    <q-icon name="delete" class="text-negative" v-on:click="removeCategory(cindex)"/>
                  </q-item-side>
                </q-item>
              </div>
            </transition-group>
          </draggable>
        </q-list>
        <span class="text-italic">Tip: drag and drop to change category order </span><br>
      </div>
      <q-modal ref="basicModal" v-if="categories.length > 0" :content-css="{padding: '20px', minWidth: '50vw'}">
        <modal :current_category="categories[current_category]"></modal>
        <br><br>
        <q-btn color="primary" @click="$refs.basicModal.close(); updateCategory()">Close</q-btn>
      </q-modal>
    </div>
  </div>
</template>


<script>
import { Alert } from 'quasar'
import draggable from 'vuedraggable'
import modal from './ProductAddModal.vue'
import shop from '../../../api/shop'
export default {
  data () {
    return {
//      categories: [],
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
        this.$store.commit('update_store', {categories: this.categories})
        this.new_category_name = ''
      }
    },
    prepCategoryUpdateState (cindex) {
      this.categories[cindex].edit = true
      this.old_category_name = this.categories[cindex].name
      this.rerender()
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
    }
  },
  computed: {
    categories: {
      get () { return this.$store.state.storeInfo.store.categories },
      set (value) { this.$store.commit('update_store', {categories: value}) }
    },
    selectedStore: {
      get () { return this.$store.state.storeInfo.selectedStore }
    }
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
