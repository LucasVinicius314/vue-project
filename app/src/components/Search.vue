<template>
  <div class="row">
    <div class="col-12">
      <div class="card my-2">
        <div class="card-body pb-1">
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Search"
              :value="search"
              @input="$emit('set-search', $event.target.value)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    search: String,
  },
};
</script>
