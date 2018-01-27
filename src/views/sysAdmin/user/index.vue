<template>
  <div>
    <transition name="fade" mode="out-in">
      <keep-alive include="sysAdminUserInit">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'sysAdminUser'
  }
</script>
