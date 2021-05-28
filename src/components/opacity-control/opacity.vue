<template>
    <div >
        <input type="range" class="dai-range">
    </div>
</template>

<script>
import control from "../../mixins/control" 
export default {
    name:"DaiOpacityControl",
    mixins:[control],
    props:{
        value:{
            type:Number,
            default:1
        },
        layerId:{
            type:String,
            default:""    
        }
    }
}
</script>

<style src="./range-style.css" scoped>
</style>