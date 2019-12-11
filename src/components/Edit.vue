<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <item-form :item="item" itemBtnTitle="Update Item"
                           @item-is-created-updated="updateItem"></item-form>
          </template>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import ItemService from '@/services/ItemService'
import LostItemForm from '@/components/LostItemForm'

export default {
  data () {
    return {
      item: {},
      childDataLoaded: false,
      temp: {},
      messagetitle: ' Update Item '
    }
  },
  components: {
    'item-form': LostItemForm
  },
  created () {
    this.getItem()
  },
  methods: {
    getItem: function () {
      ItemService.fetchItem(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.item = this.temp[0]
          this.childDataLoaded = true
          console.log('Getting Item in Edit: ' + JSON.stringify(this.item, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updateItem: function (item) {
      console.log('Before PUT ' + JSON.stringify(item, null, 5))
      ItemService.putItem(this.$router.params, item)
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(item, null, 5))
        })
        .catch(error => {
          // this.errors.push(error)
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
