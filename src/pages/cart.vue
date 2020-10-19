<template>
  <div class="cart">
    <div class="con">
      <div
        v-for="(item, index) in cartData"
        :key="item.id"
        style="margin-top: 0.3rem"
      >
        <div class="store">
          <img :src="store" alt="" />
          <span style="color: #ccc">杭州保税区仓</span>
        </div>
        <div class="goods">
          <div class="left">
            <img :src="item.status ? radio_hig : radio_nor" alt="" />
            <input
              type="checkbox"
              v-model="item.status"
              @click="changeOne(index)"
            />
          </div>
          <div class="right">
            <img :src="'/api' + item.img" alt="" />
            <div class="right_msg">
              <p class="goodsname">{{ item.goodsname }}</p>
              <p class="goodsnum">
                <button class="sub" @click="sub(item.id, item.num)" :disabled='isdisabled'>-</button>
                <span>{{ item.num }}</span>
                <button class="add" @click="add(item.id, item.num)">+</button>
              </p>
              <p class="goodsprice">单价：￥{{ item.price | filterPrice }}</p>
              <p class="all_price">
                总价：{{ (item.price * item.num) | filterPrice }}
              </p>
            </div>
          </div>
          <div class="del_btn" v-if="del_btn" @click="del_One(item.id)">
            删除
          </div>
        </div>
      </div>
    </div>
    <div class="num_min" v-if="num_min">宝贝数量不能再少了</div>
    <div class="handle">
      <div class="all">
        <div>
          <img :src="all ? radio_hig : radio_nor" alt="" />
          <input type="checkbox" v-model="all" @click="changeAll()" />
        </div>

        <p>全选</p>
      </div>
      <div class="del">
        <img :src="del ? editor_hig : editor_nor" alt="" @click="changeDel()" />
        <p>编辑</p>
      </div>
      <div class="price">
        <p>合计：{{ all_price | filterPrice }}</p>
        <p>(不含运费)</p>
      </div>
      <div class="btn">去结算</div>
    </div>
  </div>
</template>
<script>
import { reqGet, reqPost } from "../utils/request";
import store from "../assets/img/store.png";
import radio_nor from "../assets/img/radio_nor.png";
import editor_nor from "../assets/img/editor_nor.png";
import radio_hig from "../assets/img/radio_hig.png";
import editor_hig from "../assets/img/editor_hig.png";
export default {
  props: [],
  components: {},
  data() {
    return {
      cartData: [],
      all: 0,
      del: 0,
      store,
      radio_nor,
      radio_hig,
      editor_nor,
      editor_hig,
      num_min: false,
      del_btn: false,
      isdisabled: false,
    };
  },
  computed: {
    all_price() {
      let sum = 0;
      this.cartData.forEach((item) => {
        if (item.status) {
          sum += item.price * item.num;
        }
      });
      return sum;
    },
  },
  methods: {
    cartlist() {
      let uid = localStorage.getItem("uid");
      reqGet("/api/cartlist", { uid }).then((res) => {
        this.cartData = res.data.list;
        console.log(this.cartData);

        this.all = this.cartData.every((item) => item.status);
      });
    },
    changeAll() {
      if (this.all == 0) {
        this.all = 1;
      } else {
        this.all = 0;
      }
      this.cartData.forEach((item) => {
        item.status = this.all;
      });
    },
    changeDel() {
      if (this.del == 0) {
        this.del = 1;
        this.del_btn = true;
      } else {
        this.del = 0;
        this.del_btn = false;
      }
    },
    sub(id, num) {
        this.isdisabled=true;
        this.subtime = setTimeout(() => {
          if (num >= 2) {
            reqPost("/api/cartedit", { id: id, type: 1 }).then((res) => {
              this.cartlist();
            });
          } else {
            num = 1;
            this.num_min = true;
            this.time = setTimeout(() => {
              this.num_min = false;
            }, 500);
          }
            this.isdisabled=false
        }, 1000);
      
    },
    add(id, num) {
      reqPost("/api/cartedit", { id: id, type: 2 }).then((res) => {
        //   console.log(res);
        this.isdisabled=false
        this.cartlist();
      });
    },
    del_One(id) {
      reqPost("/api/cartdelete", { id }).then((res) => {
        this.cartlist();
      });
    },
    changeOne(index) {
      this.cartData[index].status = !this.cartData[index].status;
      this.all = this.cartData.every((item) => item.status);
    },
  },
  mounted() {
    this.cartlist();
  },
  beforeDestroy() {
    clearTimeout(this.time);
  },
};
</script>
<style scoped>
.cart {
  margin-top: 1rem;
  overflow: hidden;
}
.con {
  margin-left: 0.3rem;
  margin-bottom: 1.4rem;
}
.con .goods {
  display: flex;
  margin-top: 0.5rem;
}
.con .goods .left {
  display: flex;
  justify-content: center;
  align-items: center;
}
.con .goods .left input {
  position: absolute;
  opacity: 0;
}
.con .goods .right {
  display: flex;
  margin-left: 0.3rem;
  flex: 1;
}
.con .goods .right img {
  width: 1.5rem;
  height: 1.5rem;
}
.con .goods .right .right_msg {
  margin-left: 0.2rem;
  flex: 1;
}
.con .goods .right .right_msg .goodsnum {
  margin: 0.2rem 0;
}
.con .goods .right .right_msg .goodsnum span {
  border: 1px solid #333;
  padding: 0.1rem 0.2rem;
}
.con .goods .del_btn {
  width: 1rem;
  background: #ff9900;
  color: #fff;
  text-align: center;
  line-height: 2rem;
}
.num_min {
  text-align: center;
  padding: 0.2rem 0.2rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.handle {
  position: fixed;
  width: 100vw;
  height: 1.3rem;
  background: #fff;
  bottom: 1.2rem;
  left: 0;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
}
.handle .all,
.handle .del {
  float: left;
  text-align: center;
  margin-left: 0.5rem;
}
.handle .all div {
  position: relative;
}
.handle .all div input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.handle .all p,
.handle .del p {
  margin: 0;
  padding: 0;
  font-size: 14px;
}
.handle .price {
  flex: 1;
  margin-left: 0.3rem;
}
.handle .btn {
  background: #ff9900;
  display: inline-block;
  padding: 0 0.5rem;
  height: 1.3rem;
  line-height: 1.3rem;
  float: right;
  color: #fff;
}
.sub{
    border: 1px solid #000;
    width: .5rem;
    height: .5rem;
}
.add{
    border: 1px solid #000;
    width: .5rem;
    height: .5rem;
}
</style>