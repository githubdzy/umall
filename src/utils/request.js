import axios from 'axios'

const baseUrl = '/api';

//响应拦截：服务端响应组件，每次都要做的事，return内容是组件收到的真正的数据
axios.interceptors.request.use(config => {

  if (config.url != baseUrl + "/login") {
      config.headers.authorization = localStorage.getItem("token")
  }
  return config
})
axios.interceptors.response.use(res => {
  console.log("本次请求的地址是：" + res.config.url);
  return res;
})


export const reqGet = (requrl, params = {}) => {
  return axios({
    method: 'get',
    url: baseUrl + requrl,
    params
  })
}
export const reqPost = (requrl, data = {}) => {
  return axios({
    method: 'post',
    url: baseUrl + requrl,
    data
  })
}
