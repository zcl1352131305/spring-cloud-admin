<template>
  <div class="app-container">
    <el-row :gutter="30">
      <el-col :span="6">
        <router-link :to="{ path: 'add' }">
          <el-button type="text">新增菜单</el-button>
        </router-link>
        <el-tree
          :data="treeData"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :render-content="renderContent"
          @node-click="initElementInfo"
          :expand-on-click-node="false">
        </el-tree>
      </el-col>


      <el-col :span="18">
        <el-tabs v-model="activeName">
          <el-tab-pane label="菜单权限" name="auth">

            <el-button type="primary" @click="authEdit">新增权限</el-button>
            <el-button type="primary" @click="menuAuthInit" v-if="elementData === null || elementData.length <= 0">初始化菜单权限</el-button>

            <el-table :data="elementData" v-loading="loading" border style="width: 100%;margin-top: 18px">
              <el-table-column prop="id" label="id"></el-table-column>
              <el-table-column prop="name" label="元素名"></el-table-column>
              <el-table-column prop="code" label="编码"></el-table-column>
              <el-table-column prop="uri" label="权限"></el-table-column>
              <el-table-column label="操作" width="180">
                <template scope="props">
                  <el-button type="info" size="small" icon="edit" @click="authEdit(props.row.id)">修改</el-button>
                  <el-button type="danger" size="small" icon="delete" @click="authDelete(props.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>

    </el-row>

    <el-dialog title="权限" :visible.sync="authEditVisible">
      <el-form :model="authEditForm" label-width="80px">
        <el-form-item label="名称" >
          <el-input v-model="authEditForm.name"></el-input>
        </el-form-item>
        <el-form-item label="编码" >
          <el-input v-model="authEditForm.code"></el-input>
        </el-form-item>
        <el-form-item label="权限路径" >
          <el-input v-model="authEditForm.uri"></el-input>
        </el-form-item>
        <el-form-item label="方法类型" >
          <el-select v-model="authEditForm.method" placeholder="请选择方法类型" class="wd-100">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
            <el-option label="PUT" value="PUT"></el-option>
            <el-option label="DELETE" value="DELETE"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="authEditSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    name: 'init',
    data() {
      return {
        treeData: null,
        elementData: null,
        activeMenu: '',
        activeName: 'auth',
        loading: false,
        batchSelect: [], //  批量选择
        searchForm: {
          name: ''
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },

        // 添加/编辑权限
        authEditVisible: false,
        authEditForm: {
          name: '',
          code: '',
          uri: '',
          method: ''
        }
      }
    },
    activated() {
      this.getTree()
    },
    methods: {
      initElementInfo(data, node, store) {
        this.activeMenu = data.id
        this.getElementData()
      },
      authEdit(id) {
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/element/get/' + id
        }).then((data) => {
          if (data != null) {
            this.authEditForm = data
          } else {
            this.authEditForm = {
              name: '',
              code: '',
              uri: '',
              method: ''
            }
          }
        }).catch(() => {})
        this.authEditVisible = true
      },
      authDelete(id) {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('doDelete', {
            url: '/sysAdmin/element/remove/' + id
          }).then((data) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.loading = true
            this.getElementData()
          })
        }).catch(() => {})
      },
      authEditSubmit() {
        this.authEditVisible = false
        this.authEditForm.menuId = this.activeMenu
        let isEdit = false
        if (this.authEditForm.id != null) {
          isEdit = true
        }
        this.$store.dispatch('saveOrUpdate', {
          url: '/sysAdmin/element/',
          isEdit: isEdit,
          data: this.authEditForm
        }).then((data) => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.getElementData()
        })
      },
      menuAuthInit() {
        this.$store.dispatch('doPost', {
          url: '/sysAdmin/element/initElement/' + this.activeMenu
        }).then((data) => {
          this.$message({
            message: '初始化成功',
            type: 'success'
          })
          this.getElementData()
        }).catch(() => {})
      },
      getTree() {
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/menu/tree'
        }).then((data) => {
          this.treeData = data
        }).catch(() => {})
      },
      // 获取列表数据
      getElementData() {
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/element/list',
          data: {
            menuId: this.activeMenu
          }
        }).then((data) => {
          this.elementData = data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      // 删除数据
      delData(id) {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('doDelete', {
            url: '/sysAdmin/menu/remove/' + id
          }).then((data) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getTree()
          })
        }).catch(() => {})
      },
      editData(id) {
        this.$router.push('edit/' + id)
      },
      // 树状后方操作
      renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
          <span>{node.label}</span>
        </span>
        <span>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.editData(data.id) }>编辑</el-button>
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.delData(data.id) }>删除</el-button>
        </span>
        </span>
      )
      }
    }
  }
</script>
