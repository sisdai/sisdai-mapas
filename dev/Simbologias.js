import Vue from 'vue'
import App from './Simbologias.vue'
import "../src/styles/main.scss"

let div = document.createElement("div")
div.setAttribute("id","app")
document.body.appendChild(div)

Vue.directive("demo2",{
    bind:function(el){
        console.log("que onda", el)
    } 
})


new Vue({
  render: h => h(App),
}).$mount('#app')