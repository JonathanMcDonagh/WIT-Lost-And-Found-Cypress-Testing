<template>
  <div class="hero">
    <h3 class="vue-title">{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="items" :options="options">
        <a slot="like" slot-scope="props" class="fa fa-thumbs-o-up fa-2x" @click="like(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-pencil fa-2x" @click="editItem(props.row._id)"></a>
        <a slot="remove" slot-scope="props" class="fa  fa-eraser fa-2x" @click="deleteItem(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import ItemService from '@/services/ItemService'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Items',
  data () {
    return {
      messagetitle: ' Items List ',
      items: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'studentid', 'name', 'WITBuilding', 'WITRoom', 'lostitem', 'likes', 'like', 'edit', 'remove'],
      options: {
        sortable: ['likes'],
        filterable: ['studentid', 'name', 'WITBuilding', 'WITRoom', 'lostitem', 'likes'],
        perPage: 8,
        headings: {
          _id: 'ID',
          studentid: 'Student ID',
          name: 'Name',
          WITBuilding: 'WIT Building',
          WITRoom: 'WIT Room',
          lostitem: 'Lost ITem',
          likes: 'Likes'
        }
      }
    }
  },
  // Fetches Items when the component is created.
  created () {
    this.loadItems()
  },
  methods: {
    loadItems: function () {
      ItemService.fetchItems()
        .then(response => {
          // JSON responses are automatically parsed.
          this.items = response.data
          console.log(this.items)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    like: function (id) {
      ItemService.likeItem(id)
        .then(response => {
          // JSON responses are automatically parsed.
          this.loadItems()
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    editItem: function (id) {
      this.$router.params = id
      this.$router.push('edit')
    },
    deleteItem: function (id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t undo this action later',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete It',
        cancelButtonText: 'No Take Me Back',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result)
        if (result === true) {
          ItemService.deleteItem(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadItems()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this item ')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result)
          this.$swal('Cancelled', 'Item is still there!', 'info')
        }
      })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 80%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
