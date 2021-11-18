<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <nav-menu></nav-menu>
      </el-aside>
      <el-main>
        <el-header>
          <h1>开卖啦后台</h1>
        </el-header>
        <div>
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navMenu from "../views/navmenu";
export default {
  name: "layout",
  data() {
    return {};
  },
  components: { navMenu },
  created() {},
  mounted() {},
  methods: {},
};
</script>
  
<style scoped>
  .layout{
    height:100%;
  }
  .el-container{
    height: 100%;
  }
</style>