<template>
    <div class="dai-map-shape" >
        <div  v-if="shapeType!='image'" 
        :class="shapeType"
        :style="{
            'width':`${size[0]}${sizeUnits}`,
            'height':`${size[1]}${sizeUnits}`,
            'backgroundColor':backgroundColor,
            'borderWidth':`${strokeWidth}px`,
            'borderColor':strokeColor

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
                return ['circle', 'square', 'triangle','rounded-square',"image"].indexOf(value) !== -1
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
        },
        strokeColor:{
            default:'white',
            type:String
        },
        strokeWidth:{
            default:1,
            type:Number
        }
    }
}
</script>

<style lang="scss" scoped>
.dai-map-shape{
    display: inline-block;
    .circle,.square,.triangle,.rounded-square{
        border-style: solid;
    }
    .circle{
        border-radius: 50%;
    }

    .rounded-square{
        border-radius: 20%;
    }
}
</style>
