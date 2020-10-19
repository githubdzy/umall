import Vue from 'vue'
import filterPrice from './filterPrice'

let obj={
    filterPrice
}

for(var i in obj){
    Vue.filter(i,obj[i])
}