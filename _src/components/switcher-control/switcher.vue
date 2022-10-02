<template>
    <div class="switches">
        <label v-for="(option,index) in optionsAndLabels" :key="option[0]" 
        class="option" :class="{'active':option[0]==value_}">
            <input type="radio" :value="option[0]" :name="id" :id="id+'_'+index" v-model="value_" @change="change">
            {{option[1]}}
        </label>        
    </div>
</template>

<script>
import control from "../../mixins/control" 

export default {
    name:"DaiInterruptorMapa",
    mixins:[control],
    data:function(){
        return{
            value_:null,
            id:""
        }
    },
    props:{
        opciones:{
            type:Array,
            default:function(){
                return ["on","off"]
            },
            required:true   
        },
        opcionesEtiquetas:{
            type:Array,
            default:function(){
                return undefined
            }
        },value:{
            type:String
        }
    },
    methods:{
        change:function(e){
            //this.value_= e.target.value
            this.$emit("change",e.target.value)
            //emitir los eventos que accesan a propiedades o componentes si hay
            this._emitAccesorEvents("change",e.target.value)
            //this.$emit("change:#map",this.cmpMap)
        }
    },
    created:function(){
        this.id = Math.random().toString(36).substring(7)
        this.value_ = this.value!=undefined ? this.value : this.opciones[0]
    },
    computed:{
        /**
         * retornar los textos de las opciones junto a sus respectivas etiquetas
         * regresa un array como [ [opcion1,etiqueta1], [opcion2,etiqueta2] ]
         */
        optionsAndLabels:function(){
            if (this.opcionesEtiquetas && this.opcionesEtiquetas.length>=this.opciones.length){
                return this.opciones.map((option,i)=>[option,this.opcionesEtiquetas[i]])
            }

            return this.opciones.map(option=>[option,option])
        }
    },
    model:{
        prop:"value",
        event:"change"
    }

}
</script>

<style lang="scss">
.switches{
    display: flex; 
    box-shadow:1px 1px 8px 3px #00000026;
    //margin: 2px;
    border-radius: .375em;
    font-size: 14px;
    
    .option{
        position: relative;
        //border: 1px solid red;
        //padding: 6px 6px;
        padding-top: calc(.5em - 0px);
        padding-bottom: calc(.5em - 0px);
        
        
        flex-grow: 1;
        background-color: var(--control-bg-color);
        color: var(--control-color);
        text-align: center;
        font-weight: 500;
        
        line-height: 1.5;
        
        &:first-child{
            border-top-left-radius: .375em;
            border-bottom-left-radius: .375em;
        }
        &:last-child{
            border-top-right-radius: .375em;
            border-bottom-right-radius: .375em;
        }

        &:not(:last-child){
            border-right: 1px solid var(--control-bg-color-hover);
            //margin-right: -1px;
        }
        &.active{
            background-color: var(--control-bg-color-accent);
            color: var(--control-color-accent);
        }
        
        user-select: none;
        cursor: pointer;
            input{
                position: absolute;
                left: 0;
                opacity: 0;
                z-index: -1;
            }
        
    }
    

    &.inverted{
        .option{
            background-color: var(--inverted-control-bg-color);
            color: var(--inverted-control-color);
            &.active{
                background-color: var(--inverted-control-bg-color-accent);
                color: var(--inverted-control-color-accent);
            }
            &:not(:last-child){
                border-right: 1px solid var(--inverted-control-bg-color-hover);
                //margin-right: -1px;
            }
        }
    }
}
</style>