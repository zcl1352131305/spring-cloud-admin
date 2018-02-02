<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="30">
        <el-col :span="6">
          <router-link :to="{ path: 'add' }">
            <el-button type="text">新增组</el-button>
          </router-link>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent"
            @node-click="initGroupInfo">
          </el-tree>
        </el-col>
        <el-col :span="18">

            <el-tabs v-model="activeName">

              <!-- 组领导 -->
              <el-tab-pane label="组领导" name="groupLeaders">
                <el-form :inline="true" :model="leaderSearch" class="demo-form-inline" v-if="activeGroup != null && activeGroup != ''" >
                  <el-form-item label="">
                    <el-input v-model="leaderSearch.userName" placeholder="姓名"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="getLeader">查询</el-button>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" :model="leaderAddForm" class="demo-form-inline" v-if="activeGroup != null && activeGroup != ''" >
                  <el-form-item label="">
                    <el-select v-model="leaderAddForm.userId" class="wd-100" placeholder="请选择">
                      <el-option v-for="item in users" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="addLeader">添加选中用户至该组领导</el-button>
                  </el-form-item>
                </el-form>
                <el-table :data="groupLeaders" v-loading="loading" border style="width: 100%">
                  <el-table-column prop="id" label="id"></el-table-column>
                  <el-table-column prop="userName" label="姓名"></el-table-column>
                  <el-table-column prop="userBirthday" label="生日"></el-table-column>
                  <el-table-column prop="userPhone" label="电话"></el-table-column>
                  <el-table-column label="操作" width="180">
                    <template scope="props">
                      <el-button type="danger" size="small" icon="delete" @click="delLeader(props.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <!-- 组成员 -->
              <el-tab-pane label="组成员" name="groupMembers">
                <el-form :inline="true" :model="memberSearch" class="demo-form-inline" v-if="activeGroup != null && activeGroup != ''" >
                  <el-form-item label="">
                    <el-input v-model="memberSearch.userName" placeholder="姓名"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="getMember">查询</el-button>
                  </el-form-item>
                </el-form>
                <el-form :inline="true" :model="memberAddForm" class="demo-form-inline" v-if="activeGroup != null && activeGroup != ''" >
                  <el-form-item label="">
                    <el-select v-model="memberAddForm.userId" class="wd-100" placeholder="请选择">
                      <el-option v-for="item in users" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="addMember">添加选中用户至该组成员</el-button>
                  </el-form-item>
                </el-form>
                <el-table :data="groupMembers" v-loading="loading" border style="width: 100%">
                  <el-table-column prop="id" label="id"></el-table-column>
                  <el-table-column prop="userName" label="姓名"></el-table-column>
                  <el-table-column prop="userBirthday" label="生日"></el-table-column>
                  <el-table-column prop="userPhone" label="电话"></el-table-column>
                  <el-table-column label="操作" width="180">
                    <template scope="props">
                      <el-button type="danger" size="small" icon="delete" @click="delMember(props.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>


              <el-tab-pane label="组权限" name="third">
                <el-tree
                  :data="menuTrees"
                  :props="defaultProps"
                  node-key="id"
                  show-checkbox
                  ref="authTree"
                  :expand-on-click-node="false"
                  >
                </el-tree>
                <el-button type="primary" @click="updMenuAndAuth" v-if="activeGroup != null && activeGroup != ''">修改该组菜单权限</el-button>
              </el-tab-pane>
            </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'init',
    data() {
      return {
        treeData: null, // 树状 组
        activeName: 'groupLeaders', // 选项卡初始选中
        activeGroup: '', // 当前选中的组
        // 组领导相关
        groupLeaders: [], // 组领导
        leaderSearch: { // 组领导查询条件
          userName: ''
        },
        leaderAddForm: { // 组领导添加表单
          userId: ''
        },
        // 组成员相关
        groupMembers: [], // 组成员
        memberSearch: { // 组成员查询条件
          userName: ''
        },
        memberAddForm: { // 组成员添加表单
          userId: ''
        },
        users: [], // 所用用户
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        loading: true,
        // 组权限相关
        menuTrees: null
      }
    },
    activated() {
      this.getAllUsers()
      this.getAllMenusAndAuths()
      this.getData()
    },
    methods: {
      // 获取所有用户，作添加用户进组的下拉选项
      getAllUsers() {
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/user/all'
        }).then((data) => {
          this.users = data
        }).catch(() => {})
      },
      // 获取所有菜单和菜单权限
      getAllMenusAndAuths() {
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/menu/treeWithAuth'
        }).then((data) => {
          this.menuTrees = data
        }).catch(() => {})
      },
      // 获取树形组数据
      getData() {
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/group/tree'
        }).then((data) => {
          this.treeData = data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      // 删除组
      delData(id) {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('doDelete', {
            url: '/sysAdmin/group/remove/' + id
          }).then((data) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.loading = true
            if (this.activeGroup === id) {
              this.activeGroup = ''
            }
            this.getData()
          })
        }).catch(() => {})
      },
      // 点击组时初始化组信息
      initGroupInfo(data, node, store) {
        this.activeGroup = data.id
        this.initLeaderAndMember()
        this.initMenuAndAuth()
      },
      // 初始化组领导以及成员信息
      initLeaderAndMember() {
        for (var i = 0; i < this.users.length; i++) {
          this.users[i].disabled = false
        }
        this.leaderAddForm.userId = ''
        this.leaderSearch.userName = ''
        this.getLeader()
        this.memberAddForm.userId = ''
        this.memberSearch.userName = ''
        this.getMember()
      },
      // 获取组领导
      getLeader() {
        this.loading = true
        this.leaderSearch.groupId = this.activeGroup
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/group/leader/get',
          data: this.leaderSearch
        }).then((data) => {
          this.groupLeaders = data
          if (data != null) {
            // 如果有重复的则不可选
            for (var i = 0; i < this.users.length; i++) {
              var isExist = false
              for (var j = 0; j < this.groupLeaders.length; j++) {
                if (this.users[i].id === this.groupLeaders[j].userId) {
                  isExist = true
                }
              }
              if (isExist) {
                this.users[i].disabled = true
              }
            }
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      // 删除组领导
      delLeader(id) {
        this.$store.dispatch('doDelete', {
          url: '/sysAdmin/group/leader/remove/' + id
        }).then((data) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.initLeaderAndMember()
        }).catch(() => {})
      },
      // 添加组领导
      addLeader() {
        this.leaderAddForm.groupId = this.activeGroup
        this.$store.dispatch('doPost', {
          url: '/sysAdmin/group/leader/add',
          data: this.leaderAddForm
        }).then((data) => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.initLeaderAndMember()
        })
      },
      // 获取组成员
      getMember() {
        this.loading = true
        this.memberSearch.groupId = this.activeGroup
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/group/member/get',
          data: this.memberSearch
        }).then((data) => {
          this.groupMembers = data
          if (data != null) {
            // 如果有重复的则不可选
            for (var i = 0; i < this.users.length; i++) {
              var isExist = false
              for (var j = 0; j < this.groupMembers.length; j++) {
                if (this.users[i].id === this.groupMembers[j].userId) {
                  isExist = true
                }
              }
              if (isExist) {
                this.users[i].disabled = true
              }
            }
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      // 删除组成员
      delMember(id) {
        this.$store.dispatch('doDelete', {
          url: '/sysAdmin/group/member/remove/' + id
        }).then((data) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.initLeaderAndMember()
        }).catch(() => {})
      },
      // 添加组成员
      addMember() {
        this.memberAddForm.groupId = this.activeGroup
        this.$store.dispatch('doPost', {
          url: '/sysAdmin/group/member/add',
          data: this.memberAddForm
        }).then((data) => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.initLeaderAndMember()
        })
      },
      initMenuAndAuth() {
        this.$refs.authTree.setCheckedKeys([])
        this.$store.dispatch('doGet', {
          url: '/sysAdmin/group/menuAndAuth/' + this.activeGroup
        }).then((data) => {
          if (data != null && data.length > 0) {
            const checkIds = []
            data.forEach(function(res) {
              checkIds.push(res.resourceId)
            })
            this.$refs.authTree.setCheckedKeys(checkIds)
          }
        }).catch(() => {
          this.loading = false
        })
      },
      updMenuAndAuth() {
        const trees = []
        const trees1 = this.$refs.authTree.getCheckedNodes(true)
        for (var i = 0; i < trees1.length; i++) {
          trees.push({
            id: trees1[i].id,
            parentId: trees1[i].parentId,
            name: trees1[i].name,
            type: trees1[i].type
          })
        }
        console.log(JSON.stringify(trees))
        this.$store.dispatch('doPut', {
          url: '/sysAdmin/group/menuAndAuth/update',
          data: {
            groupId: this.activeGroup,
            resource: trees
          }
        }).then((data) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.initMenuAndAuth()
        }).catch(() => {
          this.loading = false
        })
      },
      // 编辑组时跳转到编辑页面
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
