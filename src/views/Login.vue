<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userForm" style="max-width: 460px" :model="form"
               :rules="rules" status-icon>
        <div class="title">安特管理系统</div>
        <el-form-item prop="userName">
          <el-input placeholder="Please input username" type="text" :prefix-icon="User" v-model="form.userName"/>
        </el-form-item>
        <el-form-item class="password" prop="userPwd">
          <el-input placeholder="Please input password" type="password" :prefix-icon="View"
                    v-model="form.userPwd"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {User, View} from "@element-plus/icons-vue"

export default {
  name: "Login",
  data() {
    return {
      User,
      View,
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
          this.$api.login(this.form).then((res) => {
            this.$store.commit("saveUserInfo", res);
            this.$router.push("/welcome");
          });
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;

  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px 3px #c7c9cb4d;

    .title {
      font-size: 40px;
      line-height: 1.5;
      text-align: center;
    }

    .password {
      //.el-input__suffix-inner {
      //  position: relative;
      //  right: 348px;
      //}

      .el-input__inner {
        padding-left: 31px;
      }
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>