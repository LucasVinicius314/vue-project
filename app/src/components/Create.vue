<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-2">
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <input
                  v-model="name"
                  placeholder="Name"
                  class="form-control my-2"
                  type="text"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <input
                  v-model="description"
                  placeholder="Description"
                  class="form-control my-2"
                  type="text"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <button class="btn btn-primary float-right" @click="_create">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",
  data: () => ({
    name: "",
    description: "",
  }),
  methods: {
    _create: function () {
      let _class = {
        name: this.name,
        description: this.description,
        user_id: 1,
      };
      this.$emit("_create", _class);
    },
  },
};
</script>
