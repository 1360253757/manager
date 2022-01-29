<template>
  <template v-for="menu in menuList">
    <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 0 && menu.children[0].menuType == 1">
      <template #title>
        <el-icon>
          <setting/>
        </el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :menu-list="menu.children"/>
    </el-sub-menu>
    <el-menu-item :index="menu.path" v-else-if="menu.menuType == 1">{{ menu.menuName }}</el-menu-item>
  </template>

<!--  <el-sub-menu index="2">-->
<!--    <template #title>-->
<!--      <el-icon>-->
<!--        <location/>-->
<!--      </el-icon>-->
<!--      <span>审批管理</span>-->
<!--    </template>-->
<!--    <el-menu-item index="2-1">休假申请</el-menu-item>-->
<!--    <el-menu-item index="2-2">待我审批</el-menu-item>-->
<!--  </el-sub-menu>-->
</template>

<script>
import {Location, Setting} from '@element-plus/icons-vue'

export default {
  name: "TreeMenu",
  components: {Setting, Location},
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    }
  },

  mounted() {
    // console.log(this.menuList)
  }
}
</script>

<style scoped>

</style>