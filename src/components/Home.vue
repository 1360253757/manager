<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
        <p>Manager</p>
      </div>
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#001529"
          text-color="#fff"
          router
      >
        <tree-menu :menu-list="menuList"/>
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="bread">
          <el-icon class="icon-fold" v-if="!isCollapse" @click="isCollapse = true">
            <fold/>
          </el-icon>
          <el-icon class="icon-expand" v-else @click="isCollapse = false">
            <expand/>
          </el-icon>
          <bread />
        </div>
        <div class="user">
          <el-badge :is-dot="noticeCount > 0" class="notice">
            <el-icon>
              <bell/>
            </el-icon>
          </el-badge>
          <el-dropdown @command="handleCommand">
            <span class="user-link">{{ userInfo.userName }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">邮箱：{{ userInfo.email }}</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
          <router-view style="height: 100%"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {Bell, Expand, Fold, Location, Setting} from '@element-plus/icons-vue'
import TreeMenu from "./TreeMenu.vue";
import Bread from "./Bread.vue";

export default {
  name: "Home",
  components: {Location, Setting, Expand, Fold, Bell, TreeMenu, Bread},
  data() {
    return {
      isCollapse: false,
      noticeCount: 0,
      menuList: [],
      userInfo: {
        userName: 'admin',
        email: 'admin@163.com'
      }
    }
  },
  mounted() {
    this.getNoticeCount()
    this.getMenuList()
  },
  methods: {
    handleCommand(key) {
      if (key == "email") return;
      this.$store.commit("saveUserInfo", "");
      this.userInfo = {};
      this.$router.push("/login");
    },
    // 获取未读通知数
    async getNoticeCount() {
      this.noticeCount = await this.$api.noticeCount()
    },

    async getMenuList() {
      this.menuList = await this.$api.getMenuList()
      console.log("menuList")
      console.log(this.menuList)
    }
  }
}
</script>

<style scoped lang="scss">
.basic-layout {
  position: relative;

  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #ffffff;
    overflow-y: auto;
    transition: width .5s;

    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;

      img {
        width: 32px;
        height: 32px;
        margin: 0 16px;
      }
    }

    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }

    // 合并
    &.fold {
      width: 64px;
    }

    // 展开
    &.unfold {
      width: 200px;
    }
  }

  .content-right {
    margin-left: 200px;
    transition: margin-left .5s;
    // 合并
    &.fold {
      margin-left: 64px;
    }

    // 展开
    &.unfold {
      margin-left: 200px;
    }

    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;

      .bread {
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-fold, .icon-expand {
          margin-right: 10px;
          cursor: pointer;
        }
      }

      .user {
        display: flex;
        align-items: center;

        .notice {
          line-height: 30px;
          cursor: pointer;
        }

        .user-link {
          margin-left: 20px;
          cursor: pointer;
          color: #409eff;
        }

        .item {
        }
      }
    }

    .wrapper {
      background-color: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);

      .main {
        background-color: #fff;
        height: 100%;
      }
    }
  }
}

</style>
