// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import * as VueGoogleMaps from 'vue2-google-maps'
import * as firebase from 'firebase'

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBVY2P4Ozdla2V4bhwo2CQbuTxTFkufsdE',
    libraries: 'places' // necessary for places input
  }
})

let app = ''
var firebaseConfig = {
  apiKey: 'AIzaSyDeDH2M_N3L1jhnBSD_yWQLrYfz04BZWMM',
  authDomain: 'wit-lost-and-found.firebaseapp.com',
  databaseURL: 'https://wit-lost-and-found.firebaseio.com',
  projectId: 'wit-lost-and-found',
  storageBucket: 'wit-lost-and-found.appspot.com',
  messagingSenderId: '1018686582997',
  appId: '1:1018686582997:web:b5f2b10d6900631fbdf25c',
  measurementId: 'G-5ZV4J3H6H9'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
