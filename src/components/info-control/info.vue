<template>
    <div class="dai-map-info" :class="{'is-expanded':is_expanded}">
        <button class="info-control button-open" @click="updateExpanded">
            <span class="dai-icon-info"></span>
        </button>

        <div class="contenedor">
            
            <div class="contenido">
                <slot></slot>
            </div>
            <button class="info-control button-close" @click="updateExpanded">
                <span class="dai-icon-cerrar"></span>
            </button>
        </div>

        
        
    </div>
    
</template>

<script>
export default {
    name:"DaiInfoMapa",
    props:{
        colapsado:{
            type:Boolean,
            default:true
        }
    },
    data:function(){
        return{
            VM_expanded:false
        }
    },
    created:function(){
        this.VM_expanded = !this.colapsado;
    },
    methods:{
        updateExpanded:function(){
            
            this.$emit('update:expanded',!this.VM_expanded)
            this.VM_expanded=!this.VM_expanded
            console.log("No sirve el update de la propiedad")
        }
    },computed:{
        is_expanded:function(){
            return this.VM_expanded
        }
    }
}
</script>

<style lang="scss">
.dai-map-info{
    position: absolute;
    top: 5px;
    left: 3px;
    background-color: var(--control-bg-color-accent);
    padding: 3px 3px 3px 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    transition: all .3s ease-in-out;
    max-width: 80%;

    button.info-control{
        background-color: var(--control-bg-color);
        color:var(--control-color);
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 20%;
        cursor: pointer;
        font-size: 20px;
        padding: 5px;
        //box-shadow: 1px 1px 8px 3px #00000026;
    }

    .button-close{
        margin-top: 3px;
        margin-right: 3px;
    }

    .contenedor{
        display: none;
        color:var(--control-color-accent);
        //padding: .5em;
        font-size: 11px;
        .contenido{
            padding: .5em;
            max-height: 40vh;
            word-wrap: break-word;
            //max-width: 70%;
            p{
                margin-block-start: .8em;
                margin-block-end: .8em;
            }
        }
    }

    &.is-expanded{
        .button-open{
            display: none;
        }
        
        .contenedor{
            display: flex;
        }
    }

}
</style>