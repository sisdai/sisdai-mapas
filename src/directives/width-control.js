export default{
    name:"width-control",
    inserted:function(el,binding){
        //let argumento = binding.arg
        let value = binding.value
        //console.log(value)
        let is_object = typeof value === 'object' && value !== null;
        //console.log(is_object)
        if(is_object){
            if(value){
                let in_mobile=value.mobile ? `calc(${value.mobile} - .6rem)` : ''
                let in_desktop=value.desktop ? `calc(${value.desktop} - .6rem)` : ''
                var media=window.matchMedia("(max-width: 850px)")
                media.addEventListener("change",function(e){
                    setPropsElement(e.target,el,in_mobile,in_desktop)
                })
                setPropsElement(media,el,in_mobile,in_desktop)
            }
            return 
        }else{
            el.classList.add("control-flex-grow-0")
            el.style.width = `calc(${binding.value} - .6rem)`
        }
        

        
        
    }
}

/**
 * 
 * @param {*} e Evento media
 * @param {*} el elemento html
 */
const setPropsElement=(e,el,in_mobile,in_desktop)=>{
    if(e.matches){
        el.style.width = in_mobile;
    }else{
        el.style.width = in_desktop;
    }
    if(el.style.width.length > 1){
        el.classList.add("control-flex-grow-0")
    }else{
        el.classList.remove("control-flex-grow-0")
    }
    //console.log(el.style.width,"cambio el media")
    //console.log(e)
}
