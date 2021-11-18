import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuList: []
    },
    mutations: {
        saveMenuList(state, menuList) {
            state.menuList = menuList
        }
    },
    actions: {
        //调用接口，获得菜单数据
        getMenuList({commit},params={}) {

            return new Promise((resolve,reject)=>{
                axios
                .get("/api/menulist", {
                    params:params
                })
                .then((res) => {
                    commit('saveMenuList',res.data.list)
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                });
            })

            
        }
    },
    getters: {

    },
    modules: {

    }
})

export default store;