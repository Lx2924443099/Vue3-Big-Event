<template>
  <pageContainer title="文章管理">
    <template #add>
      <el-button type="primary" size="default" @click="addNewArticle">发布文章</el-button>
    </template>
    <el-form :model="selectForm" ref="form" :inline="true">
      <el-form-item label="文章分类：">
        <el-select v-model="selectForm.cate_id" placeholder="请选择">
          <el-option v-for="cate in articleCateList" :key="cate.id" :value="cate.id" :label="cate.cate_name" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="selectForm.state" placeholder="请选择">
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectArticle">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="articleList" style="width: 100%; margin-top: 15px" :loading="isLoading">
      <el-table-column prop="title" width="400" label="文章标题" />
      <el-table-column prop="cate_name" label="分类" width="width" />
      <el-table-column label="发表时间" width="width">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="width" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="onEditArticle(row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="onDeleteArticle(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <el-pagination v-model:current-page="selectForm.pagenum" v-model:page-size="selectForm.pagesize"
      :page-sizes="[2, 3, 5, 10]" :background="true" layout="->,jumper ,sizes, prev, pager, next, " :total="total"
      style="margin-top: 20px; justify-content: flex-end" @update:page-size="sizeChange"
      @update:current-page="selectArticle" />
  </pageContainer>
  <CommonDrawer ref="drawer" v-model="showDrawer" title="添加文章"> </CommonDrawer>
</template>

<script setup>
import { provide, reactive, ref , watch } from 'vue'
import {
  getArticleList,
  reqArticleList,
  addArticle,
  EditArticle,
  artGetDetailService,
  deleteArticle
} from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import { dayjs } from 'element-plus'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import axios from 'axios'
import { baseURL } from '@/utils/request'

const formatTime = (time) => dayjs(time).format('YYYY年MM月DD日')

let isLoading = ref(false)
let showDrawer = ref(false)
let total = ref()
let drawer = ref()

watch([showDrawer], () => {
  drawer.value && drawer.value.setNull()
})

let newArticle = ref({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})

let selectForm = reactive({
  cate_id: '',
  state: '',
  pagenum: 1,
  pagesize: 3
})

const sizeChange = () => {
  selectForm.pagenum = 1
  selectArticle()
}

let articleList = ref([])
let articleCateList = ref([])

/**
 * 获取筛选后的文章列表
 */
const selectArticle = async () => {
  isLoading.value = true
  let result = await getArticleList(selectForm)
  articleList.value = result.data.data
  total.value = parseInt(result.data.total)
  isLoading.value = false
}

  /**
   * 获取文章分类列表
   */
  ; (async () => {
    let result = await reqArticleList()
    articleCateList.value = result.data.data
  })()

selectArticle()

const imgUrl = ref('')
const addNewArticle = () => {
  showDrawer.value = true
  imgUrl.value = ''
  newArticle.value = {
    title: '',
    cate_id: '',
    content: '',
    cover_img: '',
    state: ''
  }
}

/**
 *提交新的文章
 * @param {String} state
 */
const form = ref(null)
const subNewArticle = async (state) => {
  await form.value.validate()
  newArticle.value.state = state
  const fd = new FormData()
  for (let key in newArticle.value) {
    fd.append(key, newArticle.value[key])
  }

  if (newArticle.value.id) {
    editor.value.setHTML('')
    await EditArticle(fd)
    ElMessage.success('修改成功')
  } else {
    await addArticle(fd)
    ElMessage.success('添加成功')
  }

  showDrawer.value = false
  selectArticle()
}

const onEditArticle = async (row) => {
  console.log(row.id);
  showDrawer.value = true
  const res = await artGetDetailService(row.id)
  newArticle.value = res.data.data
  imgUrl.value = baseURL + newArticle.value.cover_img
  // 提交给后台，需要的是 file 格式的，将网络图片，转成 file 格式
  // 网络图片转成 file 对象, 需要转换一下
  newArticle.value.cover_img = await imageUrlToFile(
    imgUrl.value,
    newArticle.value.cover_img
  )
}

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

// 删除文章
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await deleteArticle(row.id)
  ElMessage.success('删除成功')
  selectArticle()
}

provide('subNewArticle', subNewArticle)
provide('imgUrl', imgUrl)
provide('newArticle', newArticle)
provide('articleCateList', articleCateList)
provide('showDrawer', showDrawer)
</script>

<style>

</style>
