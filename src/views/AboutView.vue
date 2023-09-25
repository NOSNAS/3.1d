<template>
  <div class="about">

    <h3>{{ $route.params.id }}</h3>
    <h3>{{ $route.params.postid }}</h3>
    <button 
      @click="
        {
          $router.push('/');
        }
      "
    >
    Back to Home</button>
  <button @click="goToHomepage">Advance</button>
  <button @click="router.go(-2)">two step back</button>
  <br>
  <RouterLink :to="{name: 'about', params:{id:400}}"
  >back to about page</RouterLink>

  <button @click="router.push('/routers')">to router page</button>
  <br>
  <video width="320" height="240" controls>
          <source src="shopping.mp4" type="video/mp4">
          <source src="shopping.ogg" type="video/ogg">
        </video>
        <br>
        <!--i tried to input youtube link by clicking share button, 
          this should be the correct format but idk why's not working-->
        <iframe width="420" height="345" src="https://youtu.be/cpP-fCo8Dn4?si=SvI-4Kcyd2Q2GRD-">
        </iframe>
        <br>   
  </div>

  <RouterView/>
</template>

<script setup>
import router from "../router";
import { RouterView, RouterLink } from "vue-router";


function goToHomepage() {
  router.push("children");
}
</script>

<style scoped>
div{
  border:5px outset rebeccapurple;
  background-color: lightblue;
  text-align: center;
  height: 1000px;
}

</style>
