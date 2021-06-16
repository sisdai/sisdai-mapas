<template>
    <div class="switches">
        <div v-for="(option,index) in optionsAndLabels" :key="option[0]" 
        class="option" :class="{'active':option[0]==value_}">
            <label  :for="id+'_'+index">
                <input type="radio" :value="option[0]" :name="id" :id="id+'_'+index" v-model="value_">
                {{option[1]}}
        </label>
        </div>
        
        
    </div>
</template>

<script>
import control from "../../mixins/control" 

export default {
    name:"DaiMapSwitch",
    mixins:[control],
    data:function(){
        return{
            value_:null,
            id:""
        }
    },
    props:{
        options:{
            type:Array,
            default:function(){
                return ["on","off"]
            },
            required:true   
        },
        optionsLabels:{
            type:Array,
            default:function(){
                return undefined
            }
        },value:{
            type:String
        }
    },
    created:function(){
        this.id = Math.random().toString(36).substring(7)
        this.value_ = this.value!=undefined ? this.value : this.options[0]
    },
    computed:{
        /**
         * retornar los textos de las opciones junto a sus respectivas etiquetas
         * regresa un array como [ [opcion1,etiqueta1], [opcion2,etiqueta2] ]
         */
        optionsAndLabels:function(){
            if (this.optionsLabels && this.optionsLabels.length>=this.options.length){
                return this.options.map((option,i)=>[option,this.optionsLabels[i]])
            }

            return this.options.map(option=>[option,option])
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
    
    .option{
        position: relative;
        border: 1px solid red;
        padding: 3px 5px;
        flex-grow: 1;
        &:not(:last-child){
            margin-right: -1px;
        }
        &.active{
            background-color: black;
            color: white;
        }
        
        label{
            cursor: pointer;
            input{
                position: absolute;
                left: 0;
                opacity: 0;
                z-index: -1;
            }
        } 
    }
    
}
</style>