<template>
  <div class="edit">
    <el-breadcrumb separator="/" style="margin-bottom: 10px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu/add' }"
        >菜单{{ type }}</el-breadcrumb-item
      >
    </el-breadcrumb>

    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="菜单名称" prop="title" style="width: 400px">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="form.pid" placeholder="jbshjdb">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="m in menuList"
            :key="m.id"
            :label="m.title"
            :value="m.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="1">目录</el-radio>
          <el-radio label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
          active-color="green"
          inactive-color="red"
        ></el-switch>
      </el-form-item>

      <el-form-item
        v-if="form.type == 1"
        label="目录图标"
        prop="icon"
        style="width: 400px"
      >
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type == 2" label="菜单地址" style="width: 400px">
        <el-input v-model="form.url"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "edit",
  data() {
    return {
      type: "添加",
      form: {
        pid: "", //上级菜单id
        tiele: "", //标题
        icon: "", //图标
        type: "", //类型1目录2菜单
        url: "", //菜单地址
        status: "", //状态
      },
      rules: {
        title: [
          { required: true, message: "菜单名称不可为空", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
        type: [{ required: true, message: "必选项", trigger: "change" }],
        icon: [{ required: true, message: "必选项", trigger: "blur" }],
      },
    };
  },
  components: {},
  created() {},
  computed: {
    ...mapState(["menuList"]),
  },
  mounted() {
    // this.getMenuList();
    let id = this.$route.params.id;
    if (id) {
      this.type = "编辑";
      this.getMenuInfo(id);
    }
  },
  methods: {
    onSubmit() {
      //表单验证
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let str = JSON.stringify(this.form);
          let data = JSON.parse(str);

          let url = "/api/menuadd";
          if (this.type === "编辑") {
            data.id = this.$route.params.id;
            url = "/api/menuedit";
          }
          this.$axios
            .post(url, data)
            .then((res) => {
              console.log(res);
              if (res.data.code === 200) {
                this.$router.push("/menu");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // getMenuList() {
    //   this.$axios
    //     .get("/api/menulist", { params: { istree: 1 } })
    //     .then((res) => {
    //       // console.log(res);
    //       console.log(res.data.list)
    //       this.menuList = res.data.list;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },

    getMenuInfo(id) {
      this.$axios
        .get("/api/menuinfo", { params: { id } })
        .then((res) => {
          this.form = res.data.list;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>