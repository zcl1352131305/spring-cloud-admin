<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名" >
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名" >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="form.birthday" class="wd-100" type="date" placeholder="请选择生日"></el-date-picker>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话" >
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" >
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          action="http://upload.qiniup.com"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          :data="postData">
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { doGet } from '@/api/baseApi'
  import { getQiniuHost } from '@/utils/constant'

  export default {
    name: 'edit',
    data() {
      return {
        isEdit: false,
        routerID: this.$route.params.id,
        form: {
          id: '',
          username: '',
          password: '',
          name: '',
          gender: '',
          birthday: '',
          phone: '',
          email: '',
          imageUrl: ''
        },
        postData: {
          token: '',
          key: ''
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      handleAvatarError(err, file, fileList) {
        alert(JSON.stringify(err))
      },
      handleAvatarSuccess(res, file) {
        this.form.imageUrl = getQiniuHost() + res.key
      },
      beforeAvatarUpload(file) {
        return new Promise((resolve, reject) => {
          doGet({
            url: '/sysAdmin/qiniu/token',
            data: {
              fileName: file.name
            }
          }).then(response => {
            const token = response.result
            this.postData.token = token
            this.postData.key = file.name
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      // 获取数据
      getData() {
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/user/get/' + this.routerID
        }).then((data) => {
          if (data != null) {
            this.isEdit = true
            this.form.id = data.id
            this.form.username = data.username
            this.form.password = data.password
            this.form.name = data.name
            this.form.gender = data.gender
            this.form.birthday = data.birthday
            this.form.phone = data.phone
            this.form.email = data.email
          }
        })
      },
      // 提交表单
      submitForm() {
        this.$store.dispatch('saveOrUpdate', {
          url: '/sysAdmin/user/',
          isEdit: this.isEdit,
          data: this.form
        }).then((data) => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.back()
        })
      },
      // 返回列表页
      back() {
        this.$router.back()
      }
    }

  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
