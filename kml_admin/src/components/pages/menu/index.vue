<template>
  <div class="menu">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" style="margin-top:10px;margin-bottom:10px;"
    @click="$router.push('menu/add')">添加</el-button>
    <el-table
      :data="menuList"
      style="width: 100%"
      stripe
      border
      :tree-props="{ children: 'children' }"
      row-key="id"
    >
      <el-table-column prop="id" label="编号" width="80"> </el-table-column>
      <el-table-column prop="title" label="名称" width="120"> </el-table-column>
      <el-table-column prop="icon" label="图标" width="120"> </el-table-column>
      <el-table-column prop="url" label="地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == '1' ? 'primary' : 'danger'">
            {{ scope.row.status == '1' ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="dialogVisible = true;delID=scope.row.id"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>是否确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
  name: "k-menu",
  data() {
    return {
      menuList: [],
      dialogVisible: false, //对话框显示
      delID:'',
    };
  },
  mounted() {
    this.getMenuList({istree:1})
    .then((result) => {
      this.menuList = result.data.list;
    }).catch((err) => {
      console.log(err);
    });
  },
  methods: {
    ...mapActions(["getMenuList"]),
    // getMenuList() {
    //   this.$axios
    //     .get("/api/menulist", { params: { istree: 1 } })
    //     .then((res) => {
    //       console.log(res);
    //       this.menuList = res.data.list;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    //使用vuex actions


    //编辑菜单
    edit(id) {
      console.log(id);
      this.$router.push('/menu/'+id)
    },
    //删除
    deleteMenu() {
      console.log("删除",this.delID);
      this.dialogVisible=false
      this.$axios.post('/api/menudelete',{id: this.delID})
      .then((res)=>{
        if(res.data.code === 200){
          this.menuList = res.data.list;
          }   
      })
      .catch((err)=>{
        console.error(err);
      })
    },
  },
};
</script>

<style lang="scss" scoped>
</style>