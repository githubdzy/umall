<template>
  <div class="detail">
      <div class="good">
          <div class="good_img">
              <img :src="'/api'+list.img" alt="">
          </div>
          <div class="msg">
              <div class="tit">
                  <p>{{list.goodsname}}</p>
                  <span>收藏</span>
              </div>
              <div class="pro">
                  <div class="pri">
                      <p class="price">￥{{list.price|filterPrice}}</p>
                      <p class="market_price">￥{{list.market_price|filterPrice}}</p>
                  </div>
                  <div class="btn2">
                      <div v-if="list.ishot">热卖</div>
                      <div v-if="list.isnew">新品</div>
                  </div>
              </div>
          </div>
      </div>
      <div v-html="list.description" style="margin-bottom:.90rem"></div>
      <div class="mask" v-if="add" @click.self="add=false">
          <div class="con">
              <div class="con_top">
                  <img :src="'/api'+list.img" alt="">
                  <p class="con_tit">{{list.goodsname}}</p>
              </div>
              <div class="con_msg">
                  <h3>{{list.specsname}}</h3>
                  <div class="select">
                    <span v-for="(i,j) in specsattr" :key="i" @click="span_i=j" :class="span_i==j?'selected':''">{{i}}</span>
                  </div>
              </div>
              <div class="btn" @click="cartadd()">加入购物车</div>
          </div>
      </div>
      <div class="message" v-if="msg.length>0">{{msg}}</div>
      <footer>
          <div class="btn" @click="addGoods()">加入购物车</div>
      </footer>
  </div>
</template>
<script>
import {reqGet,reqPost} from '../utils/request'
export default {
  props: [],
  components: {},
  data() {
    return {
        list:{},
        add:false,
        specsattr:[],
        span_i:0,
        num:1,
        msg:''
    };
  },
  methods:{
      getgoodsinfo(){
          reqGet('/api/getgoodsinfo',{id:this.$route.query.id}).then(res=>{
              console.log(res)
              this.list=res.data.list[0]
              this.specsattr=this.list.specsattr.slice(1,-1).replace(/\"/g, "");
              this.specsattr=this.specsattr.split(',')
          })
      },
      addGoods(){
          this.add=true;
      },
      cartadd(){
          var uid=localStorage.getItem('uid')
          reqPost("/api/cartadd",{uid:uid,goodsid:this.list.id,num:this.num}).then(res=>{
                // console.log(res)
                this.add=false;
                this.msg=res.data.msg;
                this.time=setTimeout(()=>{
                this.msg='';
                },500);
          })
      }
  },
  mounted(){
      this.getgoodsinfo();
  }
};
</script>
<style scoped>
.detail{
    overflow: hidden;
}
.good{
    margin-top: 1rem;
}
.good .good_img{
    width: 100%;
    height: 4rem;
}
.good .good_img img{
    width: 100%;
    height: 100%;
}
.good .msg{
    width: 100%;
    border-top: 2px solid #eee;
    border-bottom: .3rem solid #eee;
    padding: 0.2rem .3rem;
    box-sizing: border-box;
}
.good .msg .tit{
    display: flex;
}
.good .msg .tit p{
    width: 80%;
    margin-right: .3rem;
    font-size: .45rem;
}
.good .msg .tit span{
    flex: 1;
    text-align: center;
    color: red;
    line-height: .55rem;
    border-left: .01rem solid #eee;
}
.good .msg .pro{
    margin-top: .2rem;
    display: flex;
}
.good .msg .pro .price{
    color: red;
}
.good .msg .pro .market_price{
    text-decoration: line-through;
}
.good .msg .pro .btn2{
    margin-left: .2rem;
}
.good .msg .pro .btn2 div{
    font-size: .25rem;
    color: #fa0;
    border: .01rem solid #fa0;
    padding: .05rem .1rem;
    margin-right: .1rem;
    float: left;
}
.mask{
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
}
.con{
    width: 100vw;
    height: 60%;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: .2rem .3rem;
    box-sizing: border-box;
}
.con_top{
    display: flex;
    
}
.con_top img{
    width: 2rem;
    height: 2rem;
}
.con_top .con_tit{
    font-size: 20px;
    margin-top: .1rem;
    margin-left: .3rem;
}
.con_msg{
    margin-top: .3rem;
}
.con_msg .select{
    margin-top: .3rem;
}
.selected{
    color: #ff9900;
    border:1px solid #ff9900 !important;
}
.con_msg .select span{
    display: inline-block;
    border:1px solid #333;
    padding: .1rem .2rem;
    border-radius: 5px;
    margin: 0.1rem .05rem;
}
.con .btn{
    color: #fff;
    background: #ff9900;
    height: 1rem;
    line-height: 1rem;
    padding: 0 .3rem;
    display: inline-block;
    position: absolute;
    bottom: .3rem;
    left: 50%;
    transform: translateX(-50%);
}
.message{
  text-align: center;
  padding: .2rem .2rem;
  background: rgba(0, 0, 0, .8);
  color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
footer{
    width: 100%;
    height: 1rem;
    position: fixed;
    left: 0;
    bottom: 0;
    border-top: .02rem solid #ccc;
    background: #fff;
}
footer .btn{
    float: right;
    color: #fff;
    background: #ff9900;
    height: 1rem;
    line-height: 1rem;
    padding: 0 .3rem;
}
</style>