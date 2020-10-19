<template>
  <div class="reg">
    <div class="box_input">手机号：<input type="text" v-model="user.phone" /></div>
    <div class="box_input">昵称：<input type="text" v-model="user.name" /></div>
    <div class="box_input">密码：<input type="text" v-model="user.pass" /></div>
    <div class="btn" @click="addUser()">注册</div>
    <div class="msg" v-if="msg.length>0">{{msg}}</div>
  </div>
</template>
<script>
import {reqGet,reqPost} from '../utils/request'
import {mapGetters,mapActions} from "vuex"
export default {
  data(){
    return {
      user:{
        phone:'',
        name:'',
        pass:''
      },
      msg:''
    }
  },
  props: [],
  components: {},
  methods:{
    addUser(){
      reqPost('/api/register',{phone:this.user.phone,nickname:this.user.name,password:this.user.pass}).then(res=>{
        console.log(res)
          this.msg=res.data.msg;
          this.time=setTimeout(()=>{
            this.msg='';
            if(res.data.code==200){
              this.$router.push('/login')
            }
          },500);
      })
    }
  }
};
</script>
<style scoped>
.reg {
  width: 90%;
  margin: 0 auto;
  padding: 2.3rem 0;
}
.box_input {
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid #a3a3a3;
}
input {
  border: none;
  outline: none;
  background: #fafafa;
}
.btn {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  clear: both;
  color: #fff;
  background: #ff9900;
  margin-top: .5rem;
  border-radius: 5px;
}
.msg{
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
</style>
