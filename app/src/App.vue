<template>
  <div id="app">
    <main class="container py-3">
      <h1>Classes</h1>
      <List v-bind:classes="classes" v-on:_delete="_delete" />
    </main>
  </div>
</template>

<script>
import List from "./components/List.vue";

const { log } = console;

export default {
  name: "App",
  components: {
    List,
  },
  data: () => ({
    classes: [],
  }),
  created: function () {
    this._all();
  },
  methods: {
    _delete: function (id) {
      fetch(`http://localhost:5000/api/class/delete/${id}`)
        .then((d) => d.json())
        .then((d) => {
          log("class delete", d);
          this._all();
        })
        .catch(log);
    },
    _all: function () {
      fetch("http://localhost:5000/api/class/all")
        .then((d) => d.json())
        .then((d) => log("class all", d) || d)
        .then(({ data }) => {
          this.classes = data;
        })
        .catch(log);
    },
  },
};
</script>

<style>
</style>
