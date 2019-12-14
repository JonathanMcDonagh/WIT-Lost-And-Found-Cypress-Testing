import Api from '@/services/api'

export default {
  fetchItems () {
    return Api().get('/items')
  },
  postItem (item) {
    return Api().post('/items', item,
      { headers: {'Content-type': 'application/json'} })
  },
  likeItem (id) {
    return Api().put(`/item/${id}/like`)
  },
  deleteItem (id) {
    return Api().delete(`/items/${id}`)
  },
  fetchItem (id) {
    return Api().get(`/items/${id}`)
  },
  putItem (id, item) {
    console.log('REQUESTING ' + item._id + ' ' +
      JSON.stringify(item, null, 5))
    return Api().put(`/item/${id}/update`, item,
      { headers: {'Content-type': 'application/json'} })
  }
}
