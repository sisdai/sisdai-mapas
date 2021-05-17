import Vue from 'vue'
import App from './Capas.vue'
import "../src/styles/main.scss"

let div = document.createElement("div")
div.setAttribute("id","app")
document.body.appendChild(div)




new Vue({
  render: h => h(App),
}).$mount('#app')