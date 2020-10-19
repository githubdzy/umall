<template>
  <div id="app">
    <header v-if="$route.name">
      {{$route.name}}
      <router-link to="/register" v-if="$route.path=='/login'" class="register">注册</router-link>
      <span v-if="$route.path=='/register'" class="goback" @click="$router.go(-1)">返回</span>
      <span v-if="$route.path=='/detail'" class="goback" @click="$router.go(-1)">返回</span>
    </header>
    <header v-else-if="$route.path=='/listgoods'">
      {{$route.query.name}} 
      <span class="goback" @click="$router.go(-1)">返回</span>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log(this.$route)
  }
}
</script>

<style scoped>
#app{
  width: 100vw;
  background: #fafafa;
}
  header{
    width: 100vw;
    height:1rem;
    line-height: 1rem;
    background:#ff9900;
    text-align:center;
    color: #fff;
    font-size: 20px;
    position: fixed;
  }
  .register{
    position: absolute;
    right: .4rem;
    color: #fff;
    font-size: 20px;
  }
  .goback{
    position: absolute;
    left: .2rem;
    color: #fff;
    font-size: 20px;
  }
</style>
