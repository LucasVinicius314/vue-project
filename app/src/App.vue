<template>
  <div id="app">
    <main class="container py-3">
      <h1>Classes</h1>
      <Create @_create="_create" />
      <Search @set-search="_setsearch" :search="search" />
      <List :classes="classes" @_delete="_delete" />
    </main>
  </div>
</template>

<script>
import List from "./components/List.vue";
import Search from "./components/Search.vue";
import Create from "./components/Create.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Api from "./Api";

const { log } = console;

export default {
  name: "App",
  components: {
    Create,
    List,
    Search,
  },
  data: () => ({
    classes: [],
    search: "",
  }),
  created: function () {
    this._all();
  },
  methods: {
    _setsearch: function (e) {
      this.$set(this, "search", e);
      this._all();
    },
    _create: function (_class) {
      const { name, description = null, user_id = 1 } = _class;
      log("_class", _class);
      Api.post(`/class/create`, { name, description, user_id })
        .then((d) => {
          log("class create", d);
          const { message } = d.data;
          Swal.fire({ icon: "success", title: message });
          this._all();
        })
        .catch(({ response }) => {
          log(response);
          const { message } = response.data;
          Swal.fire({ icon: "error", title: message });
        });
    },
    _delete: function (id) {
      Api.get(`/class/delete/${id}`)
        .then((d) => {
          log("class delete", d);
          const { message } = d.data;
          Swal.fire({ icon: "success", title: message });
          this._all();
        })
        .catch(log);
    },
    _all: function () {
      Api.post(`/class/all`, { name: this.search })
        .then((d) => {
          log("class all", d);
          const { data } = d.data;
          this.$set(this, "classes", data);
        })
        .catch(log);
    },
  },
};
</script>
