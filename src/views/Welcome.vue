<template>
  <div>
    <div class="welcome-wrapper">
      <div class="wrapper-left">
        <div class="sub-title">欢迎体验</div>
        <div class="title">慕课通用后台管理系统</div>
        <div class="desc">- Vue3.0+ElementPlus+Node+Mongo打造通用后台管理系统</div>
      </div>
      <div class="wrapper-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome"
}
</script>

<style lang="scss">
.welcome-wrapper {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  width: 100%;

  .wrapper-left {
    position: relative;
    bottom: 40px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }

    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }

    .desc {
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }

  .wrapper-right {
    margin-left: 105px;
    background-image: url("./../assets/images/welcome.png");
    width: 371px;
    height: 438px;
  }
}
</style>
