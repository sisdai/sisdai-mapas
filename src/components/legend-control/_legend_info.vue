<template>
     <div class="boton-info"
        @mouseover="show=true"
        @mouseleave="show=false">
            
            <span class="dai-icon-info"></span>

            <div v-if="show"
            class="contenedor-tooltip"
            >
                <div v-html="contenido"></div>
                <div class="triangulito"></div>
            </div>
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
        }
    }
}
</script>

<style lang="scss">
.boton-info {
    position: relative;
    max-width: 2.25em;
    max-height: 2em;
    width: 2.25em;
    height: 2em;
    background-color: #DDDDDD;
    border-radius: 50%;
    text-align: center;
    padding-top: .25em;
    margin-left: .4em;    
    cursor: pointer;

    span {
        font-size:1.5em;
        line-height: 1.2;
    }

    .contenedor-tooltip { 
        // el ancho está bien, pero el alto se va a tener que ajustar a la extensión del texto
        max-width: 290px;
        max-height: 550px;        
        min-width: 290px;
        min-height: 550px;
        
        background-color:var(--tooltip-bg-color);
        border-radius: 8px; 
        position: absolute;
        top: 0px;
        bottom: 0px;
        // left: 0px;
        right: 0px;
        z-index: 9;
        
        font-family: Montserrat; 
        text-align: left;
        color: var(--tooltip-color);  
        font-size: 14px; 
        font-weight:400;         
        // padding: 20px; // esto se suma a los elementos <p>
        transform: translate(108%, calc(-50% + 15px));
        
        p {
            margin: 24px; // estos elementos tienen por defecto un margen de 12.6px
            line-height: 1.5;
        }

        .triangulito {
            width: 0px; 
            height: 0px; 
            border-top: 16px solid transparent; 
            border-bottom: 16px solid transparent; 
            border-right: 16px solid var(--tooltip-bg-color); 
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: -15px;
            right: 0px; 
            display: flex; 
            margin: auto 0;
        }
    }
}
</style>