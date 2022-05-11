<template>
  <div class="container">
    <div class="modal">
      <el-form ref="userForm" class="login-form" style="max-width: 460px" :model="form" :rules="rules" status-icon>
        <div class="title">后台管理系统</div>
        <el-form-item prop="userName">
          <el-input placeholder="Please input username" type="text" :prefix-icon="User" v-model="form.userName"/>
        </el-form-item>
        <el-form-item class="password" prop="userPwd">
          <el-input placeholder="Please input password" type="password" :prefix-icon="Key" v-model="form.userPwd"/>
        </el-form-item>
        <el-button type="primary" class="btn-login" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {User, Key} from "@element-plus/icons-vue"
import {toRaw} from "vue";
import utils from "../utils/utils";
import storage from "../utils/storage";

export default {
  name: "Login",
  data() {
    return {
      User,
      Key,
      form: {
        userName: "",
        userPwd: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        userPwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    }
  },
  methods: {
    login() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$api.login(this.form).then(async (res) => {
            this.$store.commit("saveUserInfo", res);
            await this.loadAsyncRoutes();
            await this.$router.push("/system/user");
          });
        } else {
          return false;
        }
      });
    },
    async loadAsyncRoutes() {
      let userInfo = storage.getItem("userInfo") || {};
      if (userInfo.token) {
        try {
          const {menuList} = await this.$api.getPermissionList();
          let routes = utils.generateRoute(menuList);
          routes.map((route) => {
            let url = `./../views/${route.component}.vue`;
            route.component = () => import(url);
            this.router.addRoute("home", route);
          });
        } catch (error) {
        }
      }
    }
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  font-family: "PingFang SC", "Microsoft Yahei", sans-serif;
}

.title {
  margin-bottom: 10px;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3453&q=80.jfif") fixed no-repeat;
  background-size: cover;
}

.login-form {
  width: 240px;
  height: 220px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  text-align: center;
  position: relative;
  z-index: 100;
  background: inherit;
  border-radius: 18px;
  overflow: hidden; /* 隐藏多余的模糊效果 */
}

.login-form::before {
  content: "";
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  position: absolute;
  top: -10px;
  left: -10px;
  overflow: hidden;
  background: inherit;
  box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.25);
  filter: blur(6px);
  z-index: -1;
}

.login-form h2 {
  font-size: 18px;
  font-weight: 400;
  color: #3d5245;
}

.login-form input,
.login-form button {
  margin: 6px 0;
  height: 36px;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 0 14px;
  color: #3d5245;
}

.login-form input::placeholder {
  color: #3d5245;
}

/* 补充，取消选中高亮蓝框 */
.login-form button:focus,
.login-form input:focus {
  outline: 0;
}

.login-form button {
  margin-top: 24px;
  background-color: rgba(57, 88, 69, 0.4);
  color: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.4s;
}

.login-form button:hover {
  background-color: rgba(12, 80, 38, 0.67);
}

.login-form button:focus {
  outline: 0;
}

.login-form button::before,
.login-form button::after {
  content: "";
  display: block;
  width: 80px;
  height: 100%;
  background: rgba(179, 255, 210, 0.5);
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  transform: skewX(-15deg);
  filter: blur(30px);
  overflow: hidden;
  transform: translateX(-100px);
}

.login-form button::after {
  width: 40px;
  background: rgba(179, 255, 210, 0.3);
  left: 60px;
  opacity: 0;
  filter: blur(5px);
}

.login-form button:hover::before {
  transition: 1s;
  transform: translateX(320px);
  opacity: 0.7;
}

.login-form button:hover::after {
  transition: 1s;
  transform: translateX(320px);
  opacity: 1;
}

</style>
