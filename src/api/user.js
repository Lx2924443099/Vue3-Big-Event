import request from '@/utils/request'

// /api/reg
// 注册功能
/**
 *注册
 * @param {object} regInfo
 * @returns Promise
 */
export const userRegisterService = (regInfo) =>
  request.post('/api/reg', { ...regInfo })

// /api/login
/**
 * 登录功能
 * @param {object} loginInfo
 * @returns Promise
 */
export const userLoginService = (loginInfo) =>
  request.post('/api/login', { ...loginInfo })

// /my/userinfo
export const getUserInfo = () => request({ url: '/my/userinfo', method: 'get' })

// /my/userinfo
export const editUserInfo = (data) =>
  request({ url: '/my/userinfo', method: 'put', data })

// /my/update/avatar
export const changeAvatar = (avatar) =>
  request({ url: '/my/update/avatar', method: 'patch', data: { avatar } })

// /my/updatepwd
export const resetPassword = (form) =>
  request({ url: '/my/updatepwd', method: 'patch', data: { ...form.value } })
