<template>
  <pageContainer title="文章分类">
    <template #add>
      <el-button type="primary" size="default" @click="addCate">添加分类</el-button>
    </template>
    <el-table :data="tabData" style="width: 100%" v-loading="loading">
      <el-table-column type="index" width="100" label="序号" />
      <el-table-column prop="cate_name" label="分类名称" width="width" />
      <el-table-column prop="cate_alias" label="分类别名" width="width" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="onEditChannel(row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="onDeleteChannel(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </pageContainer>

  <el-dialog v-model="dialogFormVisible" title="添加分类" width="30%">
    <el-form :model="newCate">
      <el-form-item label="分类名称" required>
        <el-input v-model="newCate.cate_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分类别名" required>
        <el-input v-model="newCate.cate_alias" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handerAddOrEdit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import {
  reqArticleList,
  DeleteArtcleCate,
  AddArtcleCate,
  EditArtcleCate
} from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'

let tabData = ref([])
let loading = ref(false)
let dialogFormVisible = ref(false)

/**
 * 获取文章分类列表
 */
const getChannelList = async () => {
  loading.value = true
  const result = await reqArticleList()
  tabData.value = result.data.data
  loading.value = false
}

const onEditChannel = (row) => {
  newCate.value.cate_name = row.cate_name
  newCate.value.cate_alias = row.cate_alias
  newCate.value.id = row.id
  dialogFormVisible.value = true
}

const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await DeleteArtcleCate(row)
  ElMessage.success('删除成功!')
  getChannelList()
}

let newCate = ref({
  id: '',
  cate_name: '',
  cate_alias: ''
})

const addCate = () => {
  newCate.value.cate_name = ''
  newCate.value.cate_alias = ''
  newCate.value.id = ''
  dialogFormVisible.value = true
}

const handerAddOrEdit = async () => {
  dialogFormVisible.value = false
  if (newCate.value.id == '') {
    await AddArtcleCate(newCate)
    ElMessage.success('添加成功!')
  } else {
    await EditArtcleCate(newCate)
    ElMessage.success('修改成功!')
  }

  getChannelList()
}

getChannelList()
</script>

<style scoped>
.el-input {
  width: 91%;
}

.el-form-item {
  margin-left: 5%;
}
</style>
