<template>
  <div>
    <keep-alive include="sysAdminUserInit">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'sysAdminUser'
  }
</script>
