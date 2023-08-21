import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo, editUserInfo } from '@/api/user'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const user = ref({})
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const setUserInfo = async () => {
      let result = await getUserInfo()
      user.value = result.data.data
    }

    const removeUserInfo = () => {
      user.value = ''
    }

    const newUserInfo = async (newUser) => {
      await editUserInfo(newUser)
      setUserInfo()
      ElMessage.success('修改成功')
    }

    return {
      token,
      user,
      setToken,
      removeToken,
      setUserInfo,
      removeUserInfo,
      newUserInfo
    }
  },
  {
    persist: true
  }
)
