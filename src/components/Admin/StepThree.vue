<template>
  <div>
    <div class="">
      <div class="panel panel-default">
        <div class="panel-heading categories_header">
          <span class="text-primary">Add Categories</span>
          <div class="input-group">
            <input type="text"
               v-model="new_category_name"
               placeholder="Category Name"
               @keyup.enter="addCategory()"
               id="addCategory"
               class="form-control">
            <button type="button"
              class="tertiary"
              @click="addCategory()"
              @keyup.enter="addCategory()">
              <i>add</i>
            </button>
          </div>
        </div>
      </div>
      <br>
      <!--<q-tree-->
        <!--:model="treeModel"-->
        <!--contract-html="<i>remove_circle</i>"-->
        <!--expand-html="<i>add_circle</i>"-->
        <!--class=""-->
      <!--&gt;</q-tree>-->
      <div v-if="categories.length > 0" class="panel-body">
        <div class="list item-delimiter">
          <draggable v-model="categories">
            <transition-group name="list-complete">
              <div class="item" v-for="(category, cindex) in categories" v-bind:key="category.name">
                <input type="text"
                   v-if="category.edit"
                   v-model="category.new_c_name"
                   placeholder="Category Name"
                   @keyup.enter="updateCategory(cindex)"
                   id="updateCategory"
                   class="item-content">
                  <div class="item-content has-secondary text-dark text-bold" v-if="!category.edit">
                    {{ category.name }}
                  </div>
                  <div class="item-secondary row" v-if="!category.edit">
                    <i class="text-tertiary" v-on:click="prepCategoryUpdateState(cindex)">mode_edit</i>
                    <i class="text-primary" v-bind:key="category.showNewPostModal" @click="$refs.basicModal.open(); current_category = cindex">add</i>
                    <i class="small text-negative" v-on:click="removeCategory(cindex)">delete</i>
                 </div>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <q-modal ref="basicModal" v-if="categories.length > 0" :content-css="{padding: '20px', minWidth: '50vw'}">
        <modal :current_category="categories[current_category]"></modal>
        <br><br>
        <button class="primary" @click="$refs.basicModal.close()">Close</button>
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
      categories: [],
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
        edit: false,
        new_c_name: this.new_category_name,
        showNewPostModal: false,
        products: []
      })
      this.$store.commit('update_store', {category_tree: this.categories})
      this.new_category_name = ''
    },
    prepCategoryUpdateState: function (cindex) {
      this.categories[cindex].edit = true
    },
    updateCategory: function (cindex) {
      this.categories[cindex].name = this.categories[cindex].new_c_name
      this.categories[cindex].edit = false
      this.$store.commit('update_store', {category_tree: this.categories})
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
