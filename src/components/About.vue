<template>
  <div class="hero">
    <div id="aboutPageBG">
    <h3 class="vue-title"><i class="fa fa-info" style="padding: 3px"></i>{{messagetitle}}</h3>
    <p class="aboutText">We at WIT Lost And Found are focused on returning lost items to their rightful owners<br>
    If you or a friend has found a item please report it, you can do so by clicking <a href="/#/lostitem">here</a><br>
    Thank you from WIT Lost and Found<br>
      <img src="http://iopasolutions.com/wp-content/uploads/2015/03/thank-you.jpg" style="width: 300px; height: 300px">
    </p>
  </div>
  </div>
</template>

<script>export default {name: 'About', data () { return {messagetitle: ' About WIT Lost And Found '} }}
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 40pt;
    margin-bottom: 10px;
  }

  .aboutText {
    margin-top: 30px;
    text-align: center;
    font-size: 22px;
  }
</style>
