import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import user from "./modules/user"

import actions from "./actions"
import {state,getters,mutations} from "./mutations"

export default new Vuex.Store({
    //state 状态
    state,
    //修改state
    mutations,
    //组件派发的动作
    actions,
    //导出数据
    getters,

    //模块
    modules:{
        user
    }
})