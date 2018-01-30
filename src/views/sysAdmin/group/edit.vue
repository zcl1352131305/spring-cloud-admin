<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="组名" >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="编码">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio label="1">普通</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父级组">
        <el-select v-model="form.parentId" class="wd-100" placeholder="请选择">
          <el-option
            v-for="item in groups"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="路径" >
        <el-input v-model="form.path"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'edit',
    data() {
      return {
        isEdit: false,
        routerID: this.$route.params.id,
        groups: [],
        form: {
          id: '',
          code: '',
          name: '',
          parentId: '',
          path: '',
          type: ''
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      // 获取数据
      getData() {
        const me = this
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/group/get/' + this.routerID
        }).then((data) => {
          if (data != null) {
            this.isEdit = true
            this.form.id = data.id
            this.form.name = data.name
            this.form.code = data.code
            this.form.parentId = data.parentId
            this.form.path = data.path
            this.form.type = data.type
          }
        })
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/group/all'
        }).then((data) => {
          if (data != null) {
            this.groups = data
            this.groups.forEach(function(obj) {
              if (obj.id === me.routerID) {
                obj.disabled = true
              }
            })
            this.groups.push({
              id: '-1',
              name: '顶级'
            })
          }
        })
      },
      // 提交表单
      submitForm() {
        this.$store.dispatch('saveOrUpdate', {
          url: '/sysAdmin/group/',
          isEdit: this.isEdit,
          data: this.form
        }).then((data) => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          history.go(-1)
        })
      },
      // 返回列表页
      back() {
        history.go(-1)
      }
    }

  }
</script>
