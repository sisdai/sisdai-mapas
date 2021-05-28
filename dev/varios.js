import Vue from 'vue'
import App from './Varios.vue'
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