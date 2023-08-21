<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-aside width="200px">
        <CommonAside />
      </el-aside>
      <el-container>
        <el-header style="padding: 0">
          <CommonHeader />
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
const userStore = useUserStore()

onMounted(() => {
  userStore.setUserInfo()
})
</script>

<style scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;
  }
}
</style>
