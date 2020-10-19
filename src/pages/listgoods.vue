<template>
  <div class="listgoods">
      <router-link :to="'/detail?id='+item.id" class="card" v-for="item in list" :key="item.id">
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
</template>
<script>
import {reqGet,reqPost} from '../utils/request'
export default {
  props: ['name'],
  components: {},
  data() {
    return {
        list:[]
    };
  },
  methods:{
      getgoods(){
          reqGet("/api/getgoods",{fid:this.$route.query.id}).then(res=>{
            //   console.log(res);
              this.list=res.data.list;
          })
      }
  },
  mounted(){
      this.getgoods();
  }
};
</script>
<style scoped>
.listgoods{
    height: 100%;
    overflow: hidden;
    padding-top: 1rem;
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