<template>
  <button :value="value" @click="umber">{{ value }}</button>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    umber () {
      this.$emit('number', this.value)
    }
  }
}
</script>
<style scope>
</style>
