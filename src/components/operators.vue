<template>
  <button  @click="operate">{{ value }}</button>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    value: String,
    required: true
  },
  methods: {
    operate () {
      this.$emit('operate', this.value)
    }
  }
}
</script>
<style scope>
</style>
