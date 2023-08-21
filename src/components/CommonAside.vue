<template>
  <el-menu active-text-color="#ffd04b" background-color="#232323" class="el-menu-vertical-demo"
    :default-active="$route.path" text-color="#fff" router>
    <img src="@/assets/logo1.png" alt="" style="height: 120px" />
    <el-menu-item index="/article/channel">
      <el-icon>
        <Management />
      </el-icon>
      <span>文章分类</span>
    </el-menu-item>
    <el-menu-item index="/article/manage">
      <el-icon>
        <Promotion />
      </el-icon>
      <span>文章管理</span>
    </el-menu-item>
    <el-sub-menu index="/user">
      <template #title>
        <el-icon>
          <UserFilled />
        </el-icon>
        <span>个人中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/user/profile">
          <el-icon>
            <User />
          </el-icon>
          基本资料
        </el-menu-item>
        <el-menu-item index="/user/avatar">
          <el-icon>
            <Crop />
          </el-icon>
          更换头像
        </el-menu-item>
        <el-menu-item index="/user/password">
          <el-icon>
            <EditPen />
          </el-icon>
          重置密码
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen
} from '@element-plus/icons-vue'
</script>

<style></style>
