<template>
    <div class="select">
        <select @change="change" ref="selector_nativo" v-bind="$attrs">
            <slot></slot>
        </select>
    </div>
</template>

<script>
import control from "../../mixins/control" 
export default {
    name:"DaiMapSelector",
    mixins:[control],
    data:function(){
        return{
            value_:null
        }
    },
    props:["value"],
    mounted:function(){
        this.value_ = this.$refs.selector_nativo.value
    },
    methods:{
        change:function(e){
            
            this.value_= e.target.value
            this.$emit("change",e.target.value)
            this._emitAccesorEvents("change",e.target.value)
            //this.$emit("change:#map",this.cmpMap)
        }
    },
    model:{
        prop:"value",
        event:"change"
    }
}


</script>

<style lang="scss" scoped>
.select{
    height: 2.5em;
    display: inline-block;
    position: relative;
    max-width: 100%;
    min-width: 50px;
    margin: .3rem; //3px .3rem;
    vertical-align: top;
    box-sizing: inherit;
    font-size: 13px;

    &.dark-control{
        &:after{
            border-bottom: 3px solid var(--dark-control-color);    
            border-left: 3px solid var(--dark-control-color);    
        }
        select{
            background-color: var(--dark-control-bg-color);
            color: var(--dark-control-color);
        }
    }
    

    &:after{
        //border-color: #485fc7;
        right: 1.125em;
        z-index: 4;
        border: 3px solid var(--light-control-color);
        border-radius: 2px;
        border-right: none;
        border-top: none;
        content: " ";
        display: block;
        height: .625em;
        margin-top: -.4375em;
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: rotate(-45deg);
        transform-origin: center;
        width: .625em;
        
    }

    select{
        font-size: 1em;
        padding-right: 2.5em;
        border-radius: .375em;
        box-shadow: 1px 1px 8px 3px #00000026;
        height: 2.5em;
        cursor: pointer;
        background-color: var(--light-control-bg-color);
        color: var(    --light-control-color);
        display: block;
        padding-bottom: calc(.5em - 1px);
        padding-top: calc(.5em - 1px);
        padding-left:  .75em;
        line-height: 1.5;
        margin: 0;
        position: relative;
        border: none;
        outline: 0;
        -moz-appearance: none;
        -webkit-appearance: none;
        width: 100%;
        font-weight: 600;
    }
}
</style>