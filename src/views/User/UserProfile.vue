<template>
  <el-card
    :body-style="{ padding: '20px' }"
    shadow="never"
    style="height: 600px"
  >
    <template #header>
      <div>
        <span>基本资料</span>
      </div>
    </template>
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      label-width="100px"
      :inline="false"
    >
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="用户昵称" required>
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="用户邮箱" required>
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="large"
          >提交修改</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const form = ref({
  username: '',
  nickname: '',
  email: ''
})

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

onMounted(() => {
  form.value = { ...userStore.user }
})

const formRef = ref()
const onSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    userStore.newUserInfo(form.value)
  }
}
</script>

<style scoped>
.el-form-item:not(:first-child) {
  margin-top: 25px;
}

.el-input {
  height: 40px;
  width: 500px;
}
</style>
