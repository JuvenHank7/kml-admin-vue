<template>
  <div class="navmenu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      router
      background-color="#001529"
      text-color="#999"
      unique-opend
      active-text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <div class="logo">
        <img src="../../assets/kkb.png" alt="" />
        开卖啦后台
      </div>

      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu index="menu">
        <template slot="title"
          ><i class="el-icon-s-operation"></i> <span>系统设置</span></template
        >
        <el-menu-item index="/menu">菜单管理</el-menu-item>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/admin">管理员管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navmenu",
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.logo {
  height: 70px;
  color: #fff;
  font-size: 20px;
  line-height: 70px;
  text-align: center;
}
.logo img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  border-radius: 5px;
}
.navmenu {
  height: 100%;
  background: #000;
}
.el-menu {
  width: 200px;
}
</style>