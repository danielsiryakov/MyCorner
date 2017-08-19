<template>
  <div>
    <div class="layout-padding">
      <div class="panel panel-default">
        <div class="panel-heading categories_header">
          <h5 class="text-tertiary text-bold">Add Item Categories</h5>
            <q-field icon="business">
              <q-input type="text"
                       v-model="new_category_name"
                       placeholder="Category Name"
                       @keyup.enter="addCategory()"
                       id="addCategory"
                       class="form-control"
                       :after="[{icon: 'add', handler () {addCategory()}}]" />
            </q-field>
        </div>
      </div>
      <br>
      <div v-if="categories.length > 0" class="panel-body">
        <q-list inset-separator	>
          <draggable v-model="categories">
            <transition-group name="list-complete">
              <q-item separator v-for="(category, cindex) in categories" v-bind:key="category.name">
                <q-input type="text"
                       v-if="category.edit"
                       v-model="category.new_c_name"
                       placeholder="Category Name"
                       @keyup.enter="updateCategory(cindex)"
                       id="updateCategory"
                       class="item-content"/>

                <q-item-main class="text-bold" v-if="!category.edit">
                  {{ category.name }}
                </q-item-main>
                <q-item-side v-if="!category.edit" class="">
                  <q-btn icon="mode_edit" class="text-tertiary" v-on:click="prepCategoryUpdateState(cindex)">
                    Edit
                  </q-btn>
                  <q-btn icon="add_box" color="primary" class="text-primary" v-bind:key="category.showNewPostModal" @click="$refs.basicModal.open(); current_category = cindex">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                      Add Products in Category
                    </q-tooltip>
                    Products
                  </q-btn>
                  <q-icon name="delete" class="text-negative" v-on:click="removeCategory(cindex)"/>
                </q-item-side>
              </q-item>
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
import draggable from 'vuedraggable'
import modal from './ProductAddModal.vue'
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
      new_category_i_name: ''
    }
  },
  components: {
    draggable,
    modal
  },
  methods: {
    removeCategory: function (cindex) {
      this.categories.splice(cindex, 1)
    },
    addCategory: function () {
      // add in for category state (false because done editing)
      // when clicking edit on the category you would like to update
      // the state of the respective bool in the category_states
      // will be true for input rendering until done editing
      this.categories.push({
        name: this.new_category_name,
        products: []
      })
      this.$store.commit('update_store', {categories: this.categories})
      this.new_category_name = ''
    },
    prepCategoryUpdateState: function (cindex) {
      this.categories[cindex].edit = true
    },
    updateCategory: function (cindex) {
//      this.categories[cindex].name = this.categories[cindex].new_category_name
      this.$store.commit('update_store', {categories: this.categories})
    }
  },
  computed: {
    categories: {
      get () {
        return this.$store.state.storeInfo.store.categories
      },
      set (value) {
        this.$store.commit('update_store', {categories: value})
      }
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
