<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input  placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" >查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>
