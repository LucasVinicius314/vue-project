<template>
  <div>
    <h1>{{ msg }}</h1>
    <h1>AAAAAAAAA</h1>
    <ol>
    <li v-bind:key="index" v-for="(item, index) in items">
      {{ item.text }}
    </li>
  </ol>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    msg: String,
    msg2: String,
  },
  data: () => ({
    items: [
      'asdas',
      'asdasas',
      'asdasdwadwa',
    ],
  }),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
