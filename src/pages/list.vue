<template>
  <div class="list">
      <div class="left">
          <div class="catename" v-for="item in list" :key="item.id" :class="item.id==sel?'select':''" @click="selec(item.id,item)">
              {{item.catename}}
          </div>
      </div>
      <div class="right">
            <router-link :to="'/listgoods?id='+item.id+'&name='+item.catename" v-for="item in ch" :key="item.id" class="card" :name='item.catename'>
                <img :src="'/api'+item.img" alt="">
                <p>{{item.catename}}</p>
            </router-link>
      </div>
  </div>
</template>
<script>
import {reqGet,reqPost} from '../utils/request'
export default {
  props: [],
  components: {},
  data() {
    return {
        list:[],
        sel:12,
        ch:[]
    };
  },
  methods:{
    getcatetree(){
        reqGet("/api/getcatetree").then(res=>{
            console.log(res)
            this.list=res.data.list;
            this.ch=this.list[0].children;
        })
    },
    selec(id,data){
        this.sel=id;
        this.ch=data.children
        console.log(this.ch)
    }
  },
  mounted(){
      this.getcatetree();
  }
};
</script>
<style scoped>
.list{
    height: 100%;
    display: flex;
    overflow: hidden;
    margin-top: 1rem;
}
.catename{
    width: 2.3rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    box-sizing: border-box;
    color: black;
}
.select{
    border-left: 3px solid blue;
    background: #fff;
    color: #ff9900;
}
.right{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
}
.right .card{
    width: 2.3rem;
    height: 2.3rem;
    padding: 0;
    margin: .1rem .05rem;
    position: relative;
}
.right .card img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1px solid blue;
    box-sizing: border-box;
}
.right .card p{
    width: 100%;
    background: #1d84a7;
    color: #fff;
    position: absolute;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    text-align: center;
}
</style>