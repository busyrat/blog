<template>
  <el-button type="primary">{{ label }}</el-button>
</template>
<script>
export default {
  name: 'IButton',
  props: {
    // 按钮文字
    label: {
      type: String,
      required: true
    }
  }
}
</script>
