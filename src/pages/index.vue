<template>
  <div class="index">
      <router-view class="show"></router-view>
      <footer>
          <div class="foot_list" v-for="item in tabNav" :key="item.path">
              <router-link :to="item.path" active-class="select">
                    <img :src="$route.path == item.path?item.selectImg:item.noSelect" alt="">
                    <p>{{item.text}}</p>
              </router-link>
          </div>
      </footer>
  </div>
</template>
<script>
//import {reqGet,reqPost} from '../utils/request'
import tab_home_nor from '../assets/img/tab_home_nor.png'
import tab_home_hig from '../assets/img/tab_home_hig.png'
import tab_menu_nor from '../assets/img/tab_menu_nor.png'
import tab_menu_hig from '../assets/img/tab_menu_hig.png'
import tab_shopping_nor from '../assets/img/tab_shopping_nor.png'
import tab_shopping_hig from '../assets/img/tab_shopping_hig.png'
import tab_me_nor from '../assets/img/tab_me_nor.png'
import tab_me_hig from '../assets/img/tab_me_hig.png'
import { reqGet } from '../utils/request'
import Axios from 'axios'
export default {
  props: [],
  components: {},
  data() {
    return {
        tabNav:[
            {
                path:'/index/home',
                text:'首页',
                selectImg:tab_home_hig,
                noSelect:tab_home_nor
            },
            {
                path:'/index/list',
                text:'分类',
                selectImg:tab_menu_hig,
                noSelect:tab_menu_nor
            },
            {
                path:'/index/cart',
                text:'购物车',
                selectImg:tab_shopping_hig,
                noSelect:tab_shopping_nor
            },
            {
                path:'/index/mine',
                text:'我的',
                selectImg:tab_me_hig,
                noSelect:tab_me_nor
            },
        ]
    };
  },
  methods:{
  },
};
</script>
<style scoped>
.index{
    display: flex;
    width: 100%;
}
.show{
    flex: 1;
    margin-bottom: 1.3rem;
}
footer{
    width: 100%;
    height: 1rem;
    border-top: 1px solid #eee;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    padding-top: 0.2rem;
    background: #fff;
    overflow: hidden;
}
.foot_list{
    flex: 1;
    text-align: center;
    /* line-height: 1rem; */
}
.foot_list a{
    color: black;
    -webkit-tap-highlight-color:transparent;
}
.foot_list a img{
    width: 20px;
    height: 20px;
}
.foot_list a p{
    font-size: 13px;
    margin: 0;
    padding: 0;
}
.select p{
    color: #ff9900;
}
</style>