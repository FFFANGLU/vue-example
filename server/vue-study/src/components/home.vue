<template>
  <div class="main">
    <div class="home-header">
      <img src="../assets/logo.png" alt="">
      <div class="portrait" :class={portraitLogin:isLogin}>
        <router-link  v-if="!isLogin" to="/login" tag="span">登录</router-link>
        <img  v-if="isLogin" src="../assets/portrait.png" alt="">
      </div>
    </div>
    <div class="phrase">
      Vue学习笔记
    </div>
    <div class="btns">
      <router-link to="/project" tag="div" class=" trans">我的项目</router-link>
      <router-link to="/plan" tag="div" class=" trans">我的计划</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        isLogin: false
      }
    },
    created(){
        // 拿到登录信息
      let info = this.$local.fetch('fanglu')

      this.isLogin = info.login;
    }
  }
</script>
<style>

</style>
