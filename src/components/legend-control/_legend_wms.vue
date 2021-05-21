<template>
    
    <div class="legend-wms">
        
        <label ><checkbox v-model="visible" @change="_toggle_visible"/> {{params.content.title}}</label>
        <div class="image">
            <img :src="params.content.image" alt="">
        </div>
        
        
    </div>
</template>

<script>
import checkbox from "../utils/checkbox"
import legend_item_child  from "../../mixins/legend-item-child"
export default {
    mixins:[legend_item_child],
    components:{
        checkbox
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
            padding-left: 20px;
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