<template>
  <div class="sign-up">
    <h2 class="vue-title">Sign Up</h2>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="signUp" class="loginBtn">Sign Up</button><br>
    <span class="backText">Already have an account? Click <router-link to="/login">Here</router-link> to login.</span>
  </div>
</template>

<script>
import firebase from 'firebase'
import Toasted from 'vue-toasted'
import Vue from 'vue'

// eslint-disable-next-line no-undef
Vue.use(Toasted)

export default {
  name: 'signUp',
  data () {
    return {
      email: null,
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('/#/')
          Vue.toasted.show('You have successfully signed up using the email: ' + this.email).goAway(5000)
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  .sign-up {
    margin-top: 40px;
  }
  .backText {
    font-size: 15pt;
  }
  .loginBtn {
    background-color: red;
    border-color: red;
    color: white;
  }
  .loginBtn:hover {
    color: red;
    border: 2px solid red;
    background-color: white;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
