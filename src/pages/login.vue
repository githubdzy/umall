<template>
  <div class="login">
      <div class="box_input">
        账号：<input type="text" v-model="user.phone">
      </div>
      <div class="box_input">
        密码：<input type="text" v-model="user.pass">
      </div>
      <div class="forget">忘记密码</div>
      <div class="btn" @click="login()">登录</div>
      <div class="msg" v-if="msg.length>0">{{msg}}</div>
  </div>
</template>
<script>
import {reqGet,reqPost} from '../utils/request'
export default {
  props: [],
  components: {},
  data() {
    return {
      user:{
        phone:'',
        pass:''
      },
      msg:''
    };
  },
  methods:{
    login(){
      reqPost("/api/login",{phone:this.user.phone,password:this.user.pass}).then(res=>{
        console.log(res);
        this.msg=res.data.msg;
          this.time=setTimeout(()=>{
          this.msg='';
          if(res.status==200){
            localStorage.setItem('token',res.data.list.token);
            localStorage.setItem('uid',res.data.list.uid);
            this.$router.push('/index')
          }
          },500);
        
      })
    }
  }
};
</script>
<style scoped>
.login{
  width: 90%;
  margin: 0 auto;
  padding: 2.3rem 0;
}
.box_input{
  width: 100%;
  padding:.5rem 0;
  border-bottom: 1px solid #a3a3a3;
}
input{
  border: none;
  outline: none;
  background: #fafafa;
}
.forget{
  float: right;
  margin-top: .5rem;
  font-size: 14px;
}
.btn{
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  clear: both;
  color: #fff;
  background: #ff9900;
  margin-top: 1.5rem;
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