<template>
    <div class="dai-map-shape" >
        <div  v-if="shapeType!='image'" 
        :class="shapeType"
        :style="{
            'width':`${size[0]}${sizeUnits}`,
            'height':`${size[1]}${sizeUnits}`,
            'backgroundColor':backgroundColor
            }" ></div>
    </div>
    
</template>


<script>
export default {
    props:{
        shapeType:{
            default:"circle",
            type:String,
            required:true,
            validator:function(value){
                return ['circle', 'square', 'triangle',"image"].indexOf(value) !== -1
            }
        },
        size:{
            default:function(){
                return [10,10]
            },
            type:Array
        },
        sizeUnits:{
            default:"px",
            type:String
        },
        backgroundColor:{
            default:"black",
            type:String
        },
        imageSrc:{
            default:"",
            type:String
        }
    }
}
</script>

<style lang="scss" scoped>
.dai-map-shape{
    display: inline-block;
    .circle,.square,.triangle{
        border: 1px solid black;
    }
    .circle{
        border-radius: 50%;
    }
}
</style>
