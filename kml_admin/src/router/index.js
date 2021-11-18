import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// 解决vue-router的bug
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:()=>import('../components/pages/layout.vue'),
            redirect:'/home',
            children:[
                {
                    path:'/home',
                    component:()=>import('../components/pages/home/index.vue')
                },
                {
                    path:'/menu',
                    component:()=>import('../components/pages/menu/index.vue')
                },
                {
                    path:'/menu/add',
                    component:()=>import('../components/pages/menu/edit.vue')
                },
                {
                    path:'/menu/:id',
                    component:()=>import('../components/pages/menu/edit.vue')
                },
                {
                    path:'/role',
                    component:()=>import('../components/pages/role/index.vue')
                },
                {
                    path:'/role/add',
                    component:()=>import('../components/pages/role/edit.vue')
                },
                {
                    path:'/role/:id',
                    component:()=>import('../components/pages/role/edit.vue')
                },
                {
                    path:'/admin',
                    component:()=>import('../components/pages/admin/index.vue')
                },
            ]
        },
        {
            path:'/login',
            component: ()=>import('../components/pages/login.vue')
        }
    ]
})

export default router