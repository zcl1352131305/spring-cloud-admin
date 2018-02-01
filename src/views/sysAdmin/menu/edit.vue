<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名" >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="编码" >
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" >
        <el-input v-model="form.path"></el-input>
      </el-form-item>
      <el-form-item label="图标" >
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="排序" >
        <el-input v-model="form.sort"></el-input>
      </el-form-item>

      <el-form-item label="上级菜单" >
        <el-input v-model="form.parentName" readonly placeholder="不修改则不用填"></el-input>
        <el-tree
          :data="treeData"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="changeParentNode">
        </el-tree>
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
        treeData: null,
        isEdit: false,
        routerID: this.$route.params.id,
        form: {
          id: '',
          name: '',
          code: '',
          path: '',
          icon: '',
          sort: '',
          parentId: '',
          parentName: ''
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    created() {
      this.getTree()
      this.getData()
    },
    methods: {
      getTree() {
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/menu/tree'
        }).then((data) => {
          this.treeData = [{
            id: '-1',
            name: '顶级',
            children: data
          }]
        }).catch(() => {})
      },
      // 获取数据
      getData() {
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/menu/get/' + this.routerID
        }).then((data) => {
          if (data != null) {
            this.isEdit = true
            this.form.id = data.id
            this.form.name = data.name
            this.form.code = data.code
            this.form.path = data.path
            this.form.icon = data.icon
            this.form.sort = data.sort
            this.form.parentId = data.parentId
          }
        })
      },
      changeParentNode(data, node, store) {
        if (data.id === this.routerID) {
          this.$message({
            message: '不能选择自己作为上级菜单',
            type: 'error'
          })
        } else {
          this.form.parentId = data.id
          this.form.parentName = data.name
        }
      },
      // 提交表单
      submitForm() {
        this.$store.dispatch('saveOrUpdate', {
          url: '/sysAdmin/menu/',
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
