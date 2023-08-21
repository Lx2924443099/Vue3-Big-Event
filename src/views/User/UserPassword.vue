<template>
  <el-card shadow="never" :body-style="{ padding: '20px' }">
    <template #header>
      <div>
        <span>重置密码</span>
      </div>
    </template>
    <el-form
      :model="form"
      ref="passwordForm"
      :rules="rules"
      label-width="100px"
      :inline="false"
    >
      <el-form-item prop="old_pwd" label="原密码" required>
        <el-input v-model="form.old_pwd"></el-input>
      </el-form-item>
      <el-form-item prop="new_pwd" label="新密码" required>
        <el-input v-model="form.new_pwd"></el-input>
      </el-form-item>
      <el-form-item prop="re_pwd" label="确认新密码" required>
        <el-input v-model="form.re_pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="onSubmit"
          >修改密码</el-button
        >
        <el-button size="large" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { resetPassword } from '@/api/user'
import { useUserStore } from '@/stores'
import router from '@/router'

const checkOldSame = (rule, value, cb) => {
  if (value === form.value.old_pwd) {
    cb(new Error('原密码和新密码不能一样!'))
  } else {
    cb()
  }
}

const checkNewSame = (rule, value, cb) => {
  if (value !== form.value.new_pwd) {
    cb(new Error('新密码和确认再次输入的新密码不一样!'))
  } else {
    cb()
  }
}

const rules = {
  old_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    }
  ],
  // 新密码
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    },
    { validator: checkOldSame, trigger: 'blur' }
  ],
  // 确认新密码
  re_pwd: [
    { required: true, message: '请再次确认新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是6-15位的非空字符串',
      trigger: 'blur'
    },
    { validator: checkNewSame, trigger: 'blur' }
  ]
}

let form = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const userStore = useUserStore()

const onSubmit = async () => {
  let result = await resetPassword(form)
  if (result.data.code == '0') {
    ElMessage.success('修改密码成功')
    userStore.removeToken()
    userStore.removeUserInfo()
    router.push(`/login`)
  }
}

const reset = () => {
  form.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
  }
}
</script>

<style scoped>
.el-input {
  width: 550px;
  height: 40px;
}
</style>
