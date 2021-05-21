<template>
    
    <div class="legend-wms">
        
        <label ><checkbox v-model="visible"/> {{params.content.title}}</label>
        <div class="image">
            <img :src="params.content.image" alt="">
        </div>
        
        
    </div>
</template>

<script>
import checkbox from "../utils/checkbox"
export default {
    props:["params"],
    components:{
        checkbox
    },
    data:function(){
        return{
            visible:false
        }
    }
}
</script>

<style lang="scss" scoped>
    .legend-wms{
        display: flex;
        flex-direction: column;
        //align-items: center;
        justify-content: flex-start;
        .image{
            //flex-grow: 1;
            padding-left: 1rem;
            img{
                max-width:150px
            }
        }

        label{
            //flex-grow: 1;
            cursor: pointer;
            font-size: 1.1em;
            
        }
        
    }
</style>