<template>
  <transition name="fade" mode="out-in">
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="80px">
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
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'sysAdminUserEdit',
    data() {
      return {
        routerID: this.$route.params.id,
        form: {
          name: '',
          gender: '',
          birthday: ''
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      // 获取数据
      getData() {
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/user/get/' + this.routerID
        }).then((data) => {
          this.form.name = data.name
          this.form.gender = data.gender
          console.log(JSON.stringify(data))
        })
      },
      // 提交表单
      submitForm() {
        alert(this.routerID)
      },
      // 返回列表页
      back() {
        history.go(-1)
      }
    }

  }
</script>
