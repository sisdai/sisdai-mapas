<template>
    <label class="dai-checkbox-color-container" >
        <input type="checkbox" :checked="value" @change="cambio">
        <span class="color-square">
            <span class="custom-checkbox " :class="{'dai-icon-check':value}"></span>
            <span class="color" :style="{'backgroundColor':color,'backgroundImage':backgroundImage}"></span>
        </span>
        
        <slot></slot>
    </label>
</template>

<script>
export default {
    props:{
        value:{
            type:Boolean
        },
        color:{
            default:"black",
            type:String
        },
        backgroundImage:{
            default:'none',
            type:String
        }
    },
    model:{
        prop:"value",
        event:"change"
    },
    methods:{
        cambio:function(e){
            this.$emit("change",e.target.checked)
        }
    }
}
</script>

<style lang="scss" >
    .dai-checkbox-color-container{
        position: relative;
        display: flex;
        align-items: center;
        //flex-grow: 1;
        cursor: pointer;
        input{
            position: absolute;
            left: 0;
            opacity: 0;
            z-index: -1;
        }
        .color-square{
            display: flex;
            width: 30px;
            height: 27px;
            border: 1px solid black;
            border-radius: 4px;
            margin-right: .7em;
            span{
                flex-grow: 1;
            }
            .custom-checkbox{
                font-size: 15px;
                padding-top: 5px;
            }
            .color{
                background-color: black;
                min-width: 15px;
            }
        }
    }
</style>