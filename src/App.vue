<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Container msg="List" msg2="aa" />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Container from "./components/Container.vue";

export default {
  name: "App",
  components: {
    //HelloWorld,
    Container,
  },
  data: () => ({
    items: [1, 2, 5, 6],
  }),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
