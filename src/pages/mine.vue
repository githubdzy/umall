<template>
  <div>
      <div class="top_head">
          <div class="top"></div>
          <div class="head"></div>
          <p>我的收藏</p>
      </div>
      <div class="order">
          <div class="myorder">
              <span class="my">我的订单</span>
              <span class="look">查看订单</span>
          </div>
          <div class="order_status">
              <div v-for="item in msg" :key="item.id" class="status">
                <img :src="item.img" alt="">
                <p>{{item.status}}</p>
            </div>
          </div>
      </div>
      <div class="address">
          <p>地址管理</p>
      </div>
  </div>
</template>
<script>
//import {reqGet,reqPost} from '../utils/request'
import icon_refund from '../assets/img/icon_refund.png'
export default {
  props: [],
  components: {},
  data() {
    return {
        msg:[
            {   
                id:1,
                img:icon_refund,
                status:'待发货'
            },
            {
                id:2,
                img:icon_refund,
                status:'待发货'
            },
            {
                id:3,
                img:icon_refund,
                status:'待发货'
            },
            {
                id:4,
                img:icon_refund,
                status:'待发货'
            },
            {
                id:5,
                img:icon_refund,
                status:'待发货'
            },
        ]
    };
  },
};
</script>
<style scoped>
.top_head{
    width: 100vw;
    height:5rem;
    background: #fff;
    position: relative;
    margin-top: .9rem;
}
.top{
    width: 100%;
    height: 2.5rem;
    background: #ff9900;
}
.head{
    width: 1.5rem;
    height: 1.5rem;
    background: black;
    border-radius: 50%;
    border: 3px solid #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
}
.top_head P{
    color: black;
    font-size: 20px;
    position: absolute;
    left: .3rem;
    bottom: .3rem;
}
.order{
    margin-top: .2rem;
    background: #fff;
}
.order .myorder{
    border-bottom: 1px solid #333;
}
.order .myorder span{
    display: inline-block;
    padding: .3rem .5rem;
}
.order .myorder .look{
    float: right;
}
.order .order_status{
    display: flex;
}
.order .order_status .status{
    height: 1.5rem;
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.order .order_status .status img{
    width: .5rem;
    height: .5rem;
}
.address{
    margin-top: .2rem;
    background: #fff;
    height: 1.5rem;
    line-height: 1.5rem;
    padding: .1rem .5rem;
    box-sizing: border-box;
}
.address p{
    font-size: 20px;
}
</style>