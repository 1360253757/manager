<template>
  <template v-for="menu in menuList">
    <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 0 && menu.children[0].menuType == 1">
      <template #title>
        <el-icon>
          <setting v-if="menu.icon === 'system'"/>
          <document v-if="menu.icon === 'document'"/>
        </el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :menu-list="menu.children"/>
    </el-sub-menu>
    <el-menu-item :index="menu.path" v-else-if="menu.menuType == 1">{{ menu.menuName }}</el-menu-item>
  </template>
</template>

<script>
import {Location, Setting, Document} from '@element-plus/icons-vue'

export default {
  name: "TreeMenu",
  components: {Setting, Location, Document},
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    }
  }
}
</script>

<style scoped>

</style>
