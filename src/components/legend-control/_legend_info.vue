<template>
     <div class="boton-info"
        @mouseover="show=true"
        @mouseleave="show=false">
            
            
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 17 17" style="enable-background:new 0 0 17 17;" xml:space="preserve">
<g id="Componente_35_25" transform="translate(0.5 0.5)">
	<circle id="Elipse_3766" class="st0" cx="8" cy="8" r="8"/>
	<g id="Grupo_11228" transform="translate(6 3)">
		<path id="Trazado_30342" class="st1" d="M2.9,8V3.4H0.6v1.1h1.1V8H0v1.1h4.6V8H2.9z"/>
		<path id="Trazado_30343" class="st1" d="M1.9,0C1.4,0,1,0.4,1,0.9s0.4,0.9,0.9,0.9c0.5,0,0.9-0.4,0.9-0.9S2.3,0,1.9,0L1.9,0z"/>
	</g>
</g>
</svg>
            <!--
            <div v-if="show"
            class="contenedor-tooltip"
            >
                <div v-html="contenido"></div>
                <div class="triangulito"></div>
            </div>
            -->
        </div>
</template>

<script>
export default {
    props: {
        contenido:{
            type:String,
            default:""
        },
    }, data(){
        return {
            show: false,
            id:''
        }
    },
    created(){
        this.id = Math.random().toString(36).substring(7)
    },
    watch:{
        "show"(nv){
            if(nv){
                const position  = this.$el.getBoundingClientRect()
                const height = this.$el.clientHeight
                const width = this.$el.clientWidth
                
               
                const tooltip = document.createElement('div')
                tooltip.setAttribute('tooltip-id',this.id)
                //transform: translate(108%, calc(-50% + 15px));
                
                tooltip.classList.add('contenedor-tooltip')
                tooltip.innerHTML= `<div>${this.contenido}</div><div class="triangulito"></div>`
                
                document.body.appendChild(tooltip)

                tooltip.setAttribute('style',`transform: translate(${position.left+width+16}px, ${position.top+window.scrollY + (height/2)}px) translateY(-50%)`)
            }else{
                document.querySelector("[tooltip-id='"+this.id+"']").remove()
            }
            

        }
    }
}
</script>

<style lang="scss">
.st0{fill:#DDDDDD;}
.st1{fill:#141414;}
.boton-info {
    //position: relative;
    
    width: 2em;
    height: 2em;
    
    background-color: #DDDDDD;
    border-radius: 50%;
    text-align: center;
    margin-top: .25em;
    margin-left: .4em;    
    cursor: pointer;

    span {
        font-size:1.5em;
        line-height: 1.2;
    }

    
}

.contenedor-tooltip { 
        // el ancho está bien, pero el alto se va a tener que ajustar a la extensión del texto
        max-width: 290px;
        max-height: 550px;        
        min-width: 200px;
        min-height: 50px;
        
        background-color:#000000cc;
        border-radius: 8px; 
        position: absolute;
        top: 0;
        //bottom: 0px;
         left: 0;
        //right: 0px;
        z-index: 20;
        
        font-family: Montserrat; 
        text-align: left;
        color: #fff;  
        font-size: 14px; 
        font-weight:400;         
        padding: 24px; // esto se suma a los elementos <p>
        
        
        p {
            //margin: 24px; // estos elementos tienen por defecto un margen de 12.6px
            line-height: 1.5;
            &:first-child{
                margin-top: 0;
            }
            &:last-child{
                margin-bottom: 0;
            }
        }

        .triangulito {
            width: 0px; 
            height: 0px; 
            border-top: 16px solid transparent; 
            border-bottom: 16px solid transparent; 
            border-right: 16px solid #000000cc; 
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: -15px;
            right: 0px; 
            display: flex; 
            margin: auto 0;
        }
}
</style>