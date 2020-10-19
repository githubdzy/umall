<template>
  <div>
    <div class="logo">
        <div class="logo_box">
            <div class="img"><img :src="logo" alt=""></div>
            <div class="search">
                <span>寻找商品</span>
            </div>
        </div>
    </div>
    <div class="block">
        <el-carousel height="3.5rem">
            <el-carousel-item v-for="item in banner" :key="item.id">
                <img :src="'/api'+item.img" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="sel">
        <div v-for="i in sel" :key="i.id" class="sel_div">
            <img :src="i.img" alt="">
            <p>{{i.tit}}</p>
        </div>
    </div>
    <div class="con"> 
        <router-link :to="'/detail?id='+item.id" class="card" v-for="item in indexgoods" :key="item.id">
            <div class="left">
                <img :src="'/api'+item.img" alt="">
            </div>
            <div class="right">
                <p class="right_tit">{{item.goodsname}}</p>
                <p class="right_price">￥{{item.price}}</p>
                <div class="buy">立即抢购</div>
            </div>
        </router-link>
    </div>

  </div>
</template>
<script>
import {reqGet,reqPost} from '../utils/request'
import logo from '../assets/img/img/home/logo.jpg'
import list from '../assets/img/img/home/1.jpg'
export default {
  props: [],
  components: {},
  data() {
    return {
        logo,
        banner:[],
        sel:[
            {
                id:1,
                img:list,
                tit:'限时抢购'
            },
            {
                id:2,
                img:list,
                tit:'积分商城'
            },
            {
                id:3,
                img:list,
                tit:'联系我们'
            },
            {
                id:4,
                img:list,
                tit:'商品分类'
            },
        ],
        indexgoods:[]
    };
  },
  methods:{
      getbanner(){
          reqGet("/api/getbanner").then(res=>{
            //   console.log(res);
              this.banner=res.data.list;
          })
      },
      getindexgoods(){
          reqGet("/api/getindexgoods").then(res=>{
              console.log(res);
              this.indexgoods=res.data.list[0].content;
              console.log(this.indexgoods)
          })
      }
  },
  mounted(){
      this.getbanner();
      this.getindexgoods();
  }
};
</script>
<style>
.logo{
    width: 100%;
    padding: .3rem 0;
}
.logo .logo_box{
    width: 100%;
    height: .5rem;
    display: flex;
}
.logo .logo_box .img{
    width: 2rem;
    height: 100%;
    margin-left: .2rem;
}
.img img{
    width: 100%;
    height: 100%;
}
.search{
    text-align: center;
    flex: 1;
}
.search span{
    background: rgba(0, 0, 0, .4);
    padding: 0.05rem .4rem;
    line-height: .5rem;
    border-radius: 10px;
}
.block img{
    width: 100%;
    height: 100%;
}
.block button{
    width: 15px;
}
.sel{
    width: 100%;
    display: flex;
}
.sel_div{
    flex: 1;
    text-align: center;
    margin-left: .05rem;
    margin-right: .05rem;
}
.sel_div img{
    width: 100%;
}
a{
    color: black;
}
.card{
    display: flex;
    margin-top: .3rem;
    padding: 0 .3rem;
}
.card .left{
    width: 2rem;
    height: 2rem;
}
.card .left img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
.card .right{
    margin-left: .3rem;
}
.card .right .right_tit{
    font-size: 20px;
}
.card .right .right_price{
    color: red;
    font-size: 18px;
    margin-top: .2rem;
}
.card .right .buy{
    background: #ff9900;
    display: inline-block;
    padding: .2rem .4rem;
    border-radius: 10px;
    color: #fff;
}
</style>




