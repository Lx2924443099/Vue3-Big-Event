<template>
  <el-card
    :body-style="{ padding: '20px' }"
    shadow="never"
    style="height: 600px"
  >
    <template #header>
      <div>
        <span>更换头像</span>
      </div>
    </template>
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="onUploadFile"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <img v-else src="@/assets/photo.png" alt="" />
    </el-upload>
    <el-button
      @click="uploadRef.$el.querySelector('input').click()"
      type="primary"
      :icon="Plus"
      size="large"
      >选择图片</el-button
    >
    <el-button
      type="success"
      :icon="Upload"
      size="large"
      :disabled="reallyUpload"
      @click="onChangeAvatar"
      >上传头像</el-button
    >
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { Plus, Upload } from '@element-plus/icons-vue'
import { changeAvatar } from '@/api/user'

const reallyUpload = ref(true)
const userStore = useUserStore()
const uploadRef = ref()
const imgUrl = ref(userStore.user.user_pic)
const onUploadFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
    reallyUpload.value = false
  }
}

const onChangeAvatar = async () => {
  await changeAvatar(imgUrl.value)
  ElMessage.success('更换头像成功')
  useUserStore.setUserInfo()
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  margin-bottom: 25px;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar {
  width: 280px;
  height: 280px;
  display: block;
}
</style>
