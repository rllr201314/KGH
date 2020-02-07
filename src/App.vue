<template>
  <div id="app">
    <!-- <router-view v-if="isRouterAlive"/> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true,
    }
  },
  methods:{
    // 刷新页面用的 方法
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    },
  },
}
</script>

<style>
#app {
  background:#f6f8fe;
}
element .style{
    width: 1rem;
}
</style>
