<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-graduation-cap" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <item-form :item="item" itemBtnTitle="Submit Item"
                         @item-is-created-updated="submitItem"></item-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import LostItemForm from '@/components/LostItemForm'
import Vue from 'vue'
import VueSweetalert from 'vue-sweetalert'
import ItemService from '../services/ItemService'
import {Vuelidate} from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueSweetalert)

export default {
  data () {
    return {
      item: {studentid: 0, name: '', WITBuilding: '', WITRoom: '', lostitem: ''},
      messagetitle: ' Report Lost Item '
    }
  },
  components: {
    'item-form': LostItemForm
  },
  methods: {
    submitItem: function (item) {
      ItemService.postItem(item)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
