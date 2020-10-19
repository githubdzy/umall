import Vue from 'vue'
import Router from 'vue-router'

const login=()=>import('../pages/login')
const register=()=>import('../pages/register')
const index=()=>import('../pages/index')
const home=()=>import('../pages/home')
const detail=()=>import('../pages/detail')
const list=()=>import('../pages/list')
const listgoods=()=>import('../pages/listgoods')
const cart=()=>import('../pages/cart')
const mine=()=>import('../pages/mine')

Vue.use(Router)

var router= new Router({
  routes: [
    {
      path:'/login',
      component:login,
      name:'登录'
    },
    {
      path:'/register',
      component:register,
      name:'注册'
    },
    {
      path:'/index',
      component:index,
      children:[
        {
          path:'home',
          component:home
        },
        {
          path:'list',
          component:list,
          name:'分类',
        },
        {
          path:'cart',
          component:cart,
          name:'购物车'
        },
        {
          path:'mine',
          component:mine,
          name:'我的'
        },
        {
          path:'',
          redirect:'home'
        }
      ]
    },
    {
      path:'/detail',
      component:detail,
      name:'商品详情'
    },
    {
      path:'/listgoods',
      component:listgoods,
      
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})


router.beforeEach((to,from,next)=>{
  if (to.path === "/login"||to.path === "/register") {
    next();
    return;
  }
  var uid=localStorage.getItem('uid')
  var token=localStorage.getItem('token')
  if(uid&&token){
    next();
    return;
  }
  next("/login")
})

export default router;

