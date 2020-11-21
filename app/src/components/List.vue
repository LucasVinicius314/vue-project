<template>
  <div class="row">
    <div class="col-12" v-for="(item, index) in classes" v-bind:key="index">
      <p v-if="classes.length === 0">No classes to show</p>
      <div class="card my-2">
        <div class="card-body">
          <div class="d-flex flex-row justify-content-between">
            <div>
              <h4>{{ item.name }}</h4>
              <p>{{ item.description }}</p>
            </div>
            <div>
              <button class="btn btn-danger" v-on:click="() => _delete(item.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    classes: Array,
  },
  methods: {
    _delete: function (id) {
      this.$emit("_delete", id);
    },
  },
};
</script>
