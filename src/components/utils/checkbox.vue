<template>
    <label class="dai-checkbox-container">
        <input type="checkbox"  :checked="value" @change="cambio">
        <span class="custom-checkbox " :class="{'dai-icon-check':value}">
        </span>
        <slot></slot>
    </label>
</template>


<script>
export default {
    props:["value"],
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

<style lang="scss" scoped>
    .dai-checkbox-container{
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

        .custom-checkbox{
            height: 1.2em;
            width: 1.2em;
            min-width: 1.2em;
            min-height: 1.2em;
            text-align: center;
            border: 1px solid var(--control-color);
            border-radius: 5px;
            background-color: var(--control-bg-color);
            font-size: 25px;
            margin-right: .4em;
            margin-bottom: 3px;

        }
    }
</style>