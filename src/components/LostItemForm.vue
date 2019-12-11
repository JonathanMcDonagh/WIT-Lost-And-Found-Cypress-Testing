<template>
  <form @submit.prevent="submit">
    <div class="form-group" :class="{ 'form-group--error': $v.studentid.$error }">
      <label class="form-control-label" name="studentid">Student Number</label>
      <input data-test="studentid" class="form__input" type="number" v-model.trim="studentid"/>
    </div>
    <div class="error" v-if="!$v.name.required">Student Number is Required</div>

    <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
      <label class="form__label">Name</label>
      <input class="form__input" v-model.trim="$v.name.$model"/>
    </div>
    <div class="error" v-if="!$v.name.required">Name is Required</div>
    <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>

    <div class="form-group">
      <label class="form-label">Select WIT Building</label>
      <select id="WITBuilding" name="WITBuilding" class="form-control" type="text" v-model="WITBuilding">
        <option value="null" selected disabled hidden>Choose Payment Type</option>
        <option value="Business">Business Building</option>
        <option value="Dome">Dome Building</option>
        <option value="FTG">FTG Building</option>
        <option value="IT">IT Building</option>
        <option value="Library">Luke Wadding Library</option>
        <option value="Main">Main Building</option>
        <option value="Nursing">Nursing Building</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div class="form-group" :class="{ 'form-group--error': $v.WITRoom.$error }">
      <label class="form__label">WIT Room Number</label>
      <input class="form__input" v-model.trim="$v.WITRoom.$model"/>
    </div>
    <div class="error" v-if="!$v.WITRoom.required">WIT Room is Required</div>
    <div class="error" v-if="!$v.WITRoom.minLength">Room must have at least {{$v.WITRoom.$params.minLength.min}} letters.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.lostitem.$error }">
      <label class="form__label">Lost Item Description</label>
      <input class="form__input" v-model.trim="$v.lostitem.$model"/>
    </div>
    <div class="error" v-if="!$v.lostitem.required">Lost Item Description is Required</div>
    <div class="error" v-if="!$v.lostitem.minLength">Description must have at least {{$v.lostitem.$params.minLength.min}} letters.</div>

    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Submit Item</button>
    </p>
    <p>
      <a href="#/items" data-test=manageitemsbtn class="btn btn-primary btn1" role="button">Manage Items</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your help!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">adding...</p>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'FormData',
  props: ['itemBtnTitle', 'item'],
  data () {
    return {
      messagetitle: ' Item ',
      studentid: this.item.studentid,
      name: this.item.name,
      WITBuilding: this.item.WITBuilding,
      WITRoom: this.item.WITRoom,
      lostitem: this.item.lostitem,
      likes: 0,
      submitStatus: null
    }
  },
  validations: {
    studentid: {
      required
    },
    name: {
      required,
      minLength: minLength(2)
    },
    WITRoom: {
      required,
      minLength: minLength(2)
    },
    lostitem: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var item = {
            studentid: this.studentid,
            name: this.name,
            WITBuilding: this.WITBuilding,
            WITRoom: this.WITRoom,
            lostitem: this.lostitem,
            likes: this.likes
          }
          this.item = item
          console.log('Submitting in ItemForm : ' + JSON.stringify(this.item, null, 5))
          this.$emit('item-is-created-updated', this.item)
        }, 500)
      }
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
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .item-form .form-control-label.text-left{
    text-align: left;
  }
  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }
  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }
  .dirty {
    border-color: #5A5;
    background: #EFE;
  }
  .dirty:focus {
    outline-color: #8E8;
  }
  .error {
    border-color: red;
    background: red;
    color: whitesmoke;
  }
  .btn-primary {
    background-color: red;
    border-color: red;
  }
  .btn-primary:hover {
    color: red;
    border: 2px solid red;
    background-color: white;
  }
  .error:focus {
    outline-color: #ffa519;
  }
</style>
