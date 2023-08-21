import request from '@/utils/request'

// /my/cate/list
/**
 * 获取文章分类列表
 * @returns Promise
 */
export const reqArticleList = () =>
  request({ url: '/my/cate/list', method: 'get' })

//   /my/cate/del
/**
 *删除文章分类
 * @param {object} param0
 * @returns
 */
export const DeleteArtcleCate = ({ id }) =>
  request({ url: `/my/cate/del?id=${id}`, method: 'delete' })

//   /my/cate/add
/**
 * 添加文章分类
 * @param {object} newArticle
 * @returns Promise
 */
export const AddArtcleCate = (newArticle) =>
  request({
    url: '/my/cate/add',
    method: 'post',
    data: {
      cate_alias: newArticle.value.cate_alias,
      cate_name: newArticle.value.cate_name
    }
  })

// /my/cate/info
/**
 * 修改文章分类
 * @param {object} newArticle
 * @returns Promise
 */
export const EditArtcleCate = (newArticle) =>
  request({
    url: '/my/cate/info',
    method: 'put',
    data: {
      id: newArticle.value.id,
      cate_alias: newArticle.value.cate_alias,
      cate_name: newArticle.value.cate_name
    }
  })

// /my/article/list?pagenum=1&pagesize=2&cate_id=40284&state=已发布
/**
 * 获取筛选后的文章列表
 * @param {object} formData
 * @returns Promise
 */
export const getArticleList = (formData) =>
  request({
    url: `/my/article/list?pagenum=${formData.pagenum}&pagesize=${formData.pagesize}&cate_id=${formData.cate_id}&state=${formData.state}`,
    method: 'get'
  })

// /my/article/add
/**
 * 添加文章
 * @param {object} data
 * @returns Promise
 */
export const addArticle = (data) =>
  request({
    url: '/my/article/add',
    method: 'post',
    data
  })

// /my/article/info
export const EditArticle = (data) =>
  request({ url: '/my/article/info', method: 'put', data })

export const artGetDetailService = (id) =>
  request.get('my/article/info', { params: { id } })

// /my/article/info
export const deleteArticle = (id) => {
  request({ url: `/my/article/info?id=${id}`, method: 'delete' })
}
