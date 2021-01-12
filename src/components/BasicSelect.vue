<template>
  <span>
    <select ref="select" @change="onChange">
      <option
        v-for="(option, index) in options"
        :key="'option_' + index"
        :value="option"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </span>
</template>

<script>
export default {
  name: 'BasicSelect',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
    value: {
      default: '',
    },
  },
  methods: {
    onChange() {
      this.$emit('input', this.$refs.select.value)
    },
  },
}
</script>

<style>
select {
  /* text-rendering: auto; */
  /* color: -internal-light-dark-color(black, white); */
  /* letter-spacing: normal; */
  /* word-spacing: normal; */
  /* text-transform: none; */
  /* text-indent: 0px; */
  /* text-shadow: none; */
  /* display: inline-block; */
  text-align: start;
  -webkit-appearance: menulist;
  /* box-sizing: border-box; */
  align-items: center;
  /* white-space: pre; */
  /* -webkit-rtl-ordering: logical; */
  /* background-color: -internal-light-dark-color(
    rgb(255, 255, 255),
    rgb(59, 59, 59)
  ); */
  /* cursor: default; */
  margin: 0em;
  /* font: 400 13.3333px Arial; */
  /* border-radius: 2px; */
  border-width: 1px;
  border-style: solid;
  /* border-color: -internal-light-dark-color(
    rgb(118, 118, 118),
    rgb(195, 195, 195)
  ); */
  border-image: initial;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

</style>
