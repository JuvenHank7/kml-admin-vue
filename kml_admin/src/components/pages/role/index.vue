<template>
  <div class="menu">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" style="margin-top:10px;margin-bottom:10px;"
    @click="$router.push('role/add')">添加</el-button>
    <el-table
      :data="roleList"
      style="width: 100%"
      stripe
      border
      row-key="id"
    >
      <el-table-column prop="id" label="编号" width="80"> </el-table-column>
      <el-table-column prop="rolename" label="名称"> </el-table-column>
      
      <el-table-column prop="status" label="状态" width="200">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == '1' ? 'primary' : 'danger'">
            {{ scope.row.status == '1' ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
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
        <el-button type="primary" @click="deleteRole">确 定</el-button>
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
      roleList: [],
      dialogVisible: false, //对话框显示
      delID:'',
    };
  },
  mounted() {
    this.getRoleList()
    
  },
  methods: {
    ...mapActions(["getMenuList"]),
   

    getRoleList(){
        this.$axios.get('/api/rolelist')
        .then((result) => {
            this.roleList = result.data.list
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
    },


    //编辑菜单
    edit(id) {
      console.log(id);
      this.$router.push('/role/'+id)
    },
    //删除
    deleteRole() {
      console.log("删除",this.delID);
      this.dialogVisible=false
      this.$axios.post('/api/roledelete',{id: this.delID})
      .then((res)=>{
        if(res.data.code === 200){
          this.roleList = res.data.list;
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