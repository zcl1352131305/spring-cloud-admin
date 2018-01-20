<template>
  <transition name="fade" mode="out-in">
    <div class="app-container">
      <div class="filter-container">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="searchForm.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="tableData" v-loading="loading" border @selection-change="handleBatchSelect" style="width: 100%">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column label="操作" width="180">
            <template scope="props">
              <router-link :to="{path: 'edit/'+ props.row.id}" tag="span">
                <el-button type="info" size="small" icon="edit">修改</el-button>
              </router-link>
              <el-button type="danger" size="small" icon="delete" @click="delData(props.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="mt-5">
          <el-col :span="24">
            <el-button class="fl" type="danger" size="small" icon="delete" :disabled="batchSelect.length === 0" @click="batchDelData">批量删除</el-button>
            <el-pagination class="fr"  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>

<script>
  import { getPageSize } from '@/utils/constant'
  import Cookies from 'js-cookie'

  export default {
    name: 'userInit',
    data() {
      return {
        tableData: null,
        loading: true,
        pageNum: 1, // 当前页码
        pageSize: getPageSize(), // 每页条数
        total: 0, // 数据总条目
        batchSelect: [], //  批量选择
        searchForm: {
          name: ''
        }
      }
    },
    created() {
      // 查询cookie中的查询条件以及分页信息并初始化
      const searchParam = JSON.parse(Cookies.get('searchParam'))
      if (searchParam != null && searchParam.routePath === this.$route.path) {
        this.searchForm.name = searchParam.data.name
        this.pageNum = searchParam.data.page
      } else {
        Cookies.set('searchParam', '')
      }
      this.getData()
    },
    methods: {
      // 分页信息加入到查询参数中
      initPageInfo() {
        this.searchForm.page = this.pageNum
        this.searchForm.limit = this.pageSize
      },
      // 页码选择
      handleCurrentChange(val) {
        this.pageNum = val
        this.getData()
      },
      handleBatchSelect(val) {
        this.batchSelect = val
      },
      // 将查询条件以及页码缓存进cookie
      setSearchParamCookie() {
        Cookies.set('searchParam', {
          data: this.searchForm,
          routePath: this.$route.path
        })
      },
      // 获取列表数据
      getData() {
        this.initPageInfo()
        this.$store.dispatch('dataPage', this.searchForm).then((data) => {
          this.tableData = data.list
          this.loading = false
          this.total = data.total
          this.setSearchParamCookie()
        }).catch(() => {
          this.loading = false
        })
      },
      // 删除数据
      delData(id) {
        alert(id)
      },
      // 批量删除数据
      batchDelData() {
        location.href = '/home/init'
      }
    }
  }
</script>
