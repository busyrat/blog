<template>
  <div>
    <Error />
    <ParentLayout />
  </div>
</template>
<script>
import ParentLayout from '@parent-theme/layouts/404.vue'
import Error from '@theme/components/error.vue'
export default {
  components: { ParentLayout, Error }
}
</script>
<style lang="scss" scoped>
</style>