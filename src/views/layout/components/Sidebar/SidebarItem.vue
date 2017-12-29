<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="item.children">

      <router-link v-if="item.children.length===1 && !item.children[0].children" :to="item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.children[0].path" class='submenu-title-noDropdown'>
          <svg-icon v-if="item.children[0].icon" :icon-class="item.children[0].icon"></svg-icon>
          <span v-if="item.children[0].name">{{generateTitle(item.children[0].name)}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span v-if="item.name">{{generateTitle(item.name)}}</span>
        </template>

        <template v-for="child in item.children">
          <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="child.path" :key="child.name">
            <el-menu-item :index="child.path">
              <svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
              <span v-if="child.name">{{generateTitle(child.name)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  methods: {
    generateTitle
  }
}
</script>

