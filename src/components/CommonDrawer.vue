<template>
  <el-drawer v-model="showDrawer" :title="props.title" direction="rtl" size="50%">
    <el-form :model="newArticle" :rules="rules" ref="form" label-width="80px">
      <el-form-item prop="title" label="文章标题" required>
        <el-input v-model="newArticle.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item prop="cate_id" label="文章分类" required>
        <el-select v-model="newArticle.cate_id" placeholder="请选择" style="width: 100%">
          <el-option v-for="cate in articleCateList" :key="cate.id" :value="cate.id" :label="cate.cate_name" />
        </el-select>
      </el-form-item>
      <el-form-item prop="cover_img" label="文章封面" required>
        <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false" :on-change="onUploadFile">
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item prop="content" label="文章内容" required>
        <div class="editor">
          <quill-editor theme="snow" ref="editor" style="min-height: 200px;" v-model:content="newArticle.content"
            contentType="html" class="quill-editor">
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="subNewArticle('已发布')">发布</el-button>
        <el-button type="info" @click="subNewArticle('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { inject, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'

const subNewArticle = inject('subNewArticle')
const imgUrl = inject('imgUrl')
const newArticle = inject('newArticle')
const articleCateList = inject('articleCateList')
const showDrawer = inject('showDrawer')
const editor = ref()

const setNull = () => {
  editor.value && editor.value.setHTML('')
}

defineExpose({ setNull })

let props = defineProps(['title'])

const rules = {
  title: [{ required: true, trigger: 'blur', message: '请输入文章标题' }],
  cate_id: [{ required: true, trigger: 'blur', message: '请选择文章分类' }],
  content: [{ required: true, trigger: 'blur', message: '请输入文章内容' }]
}

/**
 * 上传文章封面
 * @param {*} uploadFile
 */
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  newArticle.value.cover_img = uploadFile.raw
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
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.editor {
  width: 100%;

  .quill-editor {
    min-height: 200px;
  }
}
</style>
