<template>
    <div>
        <div class="range-container" >
            <input type="range" class="dai-range" step="1" max="100" min="0" @change="_cambio_input" v-model="VM_value">
        </div>
        <h4 class="title-opacity">{{title}}</h4>
    </div>
    
</template>

<script>
import control from "../../mixins/control" 
export default {
    name:"DaiOpacityControl",
    mixins:[control],
    props:{
        /**valor de la opacidad de 0 a 1 */
        value:{
            type:Number,
            default:1
        },
        /** id del layer al que se afectara */
        layerId:{
            type:String,
            default:"undefined"    
        },
        /**Titulo del control de transparencia */
        title:{
            default:"Opacidad",
            type:String
        }
    },
    data:function(){
        return {
            VM_value:0,
            VM_layer:undefined
        }
    },
    created:function(){
        this.VM_value=this.value * 100
    },
    methods:{
        _cambio_input:function(){
            let nueva_opacidad=this.VM_value/100
            if(this.VM_layer!=undefined){
                this.VM_layer.olLayer.setOpacity(nueva_opacidad)
            }
            this.$emit("update:value",nueva_opacidad);
        },
        _register_layer:function(){
            this.VM_layer = undefined;
            let layers_in_map = Object.keys( this.cmpMap.cmpLayers)
            if(layers_in_map.includes(this.layerId)){
                this.VM_layer = this.cmpMap.cmpLayers[this.layerId]
            }
        }
    },
    mounted:function(){
        this._register_layer()
    },
    model:{
        prop:"value",
        event:"change"
    },
    watch:{
        layerId:function(){
            this._register_layer()
        }
    }

}
</script>

<style src="./range-style.css" scoped>
</style>

<style lang="scss" scoped>
    .range-container{
        margin: 10px 0 0 0;
    }
    .title-opacity{
        text-align: center;
        margin-block-start: 3px;
    }
</style>