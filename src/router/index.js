import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Items from '@/components/Items'
import LostItem from '@/components/LostItem'
import About from '@/components/About'
import Map from '../components/Map'
import Edit from '../components/Edit'
import SignUp from '../components/SignUp'
import Login from '../components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/items',
      name: 'Items',
      component: Items
    },
    {
      path: '/lostitem',
      name: 'LostItem',
      component: LostItem
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      props: true
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
