<template>
  <transition name="fade" mode="out-in">
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'userEdit',
    data() {
      return {
        routerID: this.$route.params.id,
        form: {
          name: '',
          gender: ''
        }
      }
    },
    created() {
    },
    methods: {
      closeNowTag() {
        this.$store.dispatch('delVisitedViews', {
          path: this.$route.path
        }).then((views) => {
        })
      },
      submitForm() {
        alert(this.routerID)
      },
      submitForm1() {
        this.closeNowTag()
        this.$router.push('init')
      }
    }

  }
</script>
