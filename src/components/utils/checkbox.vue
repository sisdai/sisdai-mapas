<template>
    <input type="checkbox"  :checked="value" @change="cambio">
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