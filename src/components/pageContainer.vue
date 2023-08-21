<template>
  <el-card
    shadow="never"
    class="page-container"
    :body-style="{ padding: '20px' }"
  >
    <template #header>
      <div class="title">
        <span>{{ props.title }}</span>
        <slot name="add"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
