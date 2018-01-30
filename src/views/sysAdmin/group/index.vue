<template>
  <div>
    <transition name="fade" mode="out-in">
      <keep-alive include="init">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'sysAdminGroup'
  }
</script>
