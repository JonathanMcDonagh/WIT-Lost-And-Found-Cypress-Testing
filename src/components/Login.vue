<template>
  <div class="login">
    <h2 class="vue-title">Login</h2>
    <input type="text" data-test="email"  v-model="email" placeholder="Email"><br>
    <input type="password" data-test="password" v-model="password" placeholder="Password"><br>
    <button @click="login" data-test="loginbtn" type="submit" class="loginBtn">Log in</button><br>
    <span class="backText">Don't have an account? Click <router-link data-test=signupbtn to="/signup">Here</router-link> to sign up.</span>
  </div>
</template>

<script>
import firebase from 'firebase'
import Toasted from 'vue-toasted'
import Vue from 'vue'
import GSignInButton from 'vue-google-signin-button'

// eslint-disable-next-line no-undef
Vue.use(Toasted)
Vue.use(GSignInButton)

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('/#/')
          // eslint-disable-next-line no-undef
          Vue.toasted.show('You have successfully logged in using the email: ' + this.email).goAway(5000)
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}

</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
.vue-title {
  margin-top: 30px;
  text-align: center;
  font-size: 45pt;
  margin-bottom: 10px;
}
.login {
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
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
