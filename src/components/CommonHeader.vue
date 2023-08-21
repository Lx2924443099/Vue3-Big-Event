<template>
  <div class="header">
    <div style="padding-left: 20px">
      欢迎
      <strong>{{ userStore.user.nickname || userStore.user.username }}</strong>
    </div>
    <el-dropdown placement="bottom-end" style="padding-right: 20px" @command="changePage">
      <span class="el-dropdown__box">
        <el-avatar :src="userStore.user.user_pic ? userStore.user.user_pic : avatar" />
        <el-icon>
          <CaretBottom />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
          <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
          <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
          <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import {
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/photo.png'
import router from '@/router'
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const changePage = (command) => {
  if (command !== 'logout') {
    router.push(`/user/${command}`)
  } else {
    userStore.removeToken()
    userStore.removeUserInfo()
    router.push(`/login`)
  }
}
</script>

<style scoped>
.header {
  background-color: #fff;
  line-height: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .el-dropdown__box {
    display: flex;
    align-items: center;

    .el-icon {
      color: #999;
      margin-left: 10px;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }
}
</style>
