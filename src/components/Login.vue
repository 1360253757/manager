<template>
  <div>
    登录
    <el-button @click="toHome">To home</el-button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    toHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>