import  WidthControl from "./width-control";

const directives = [
    WidthControl
];


const install = Vue => {
    //console.log("se esta instalando la directiva")
    if (install.installed) return
    install.installed = true
    directives.forEach(directive => {
        Vue.directive(directive.name, directive)
    })
}


export {
    install,
    WidthControl
  }
  export default {
    install
  }