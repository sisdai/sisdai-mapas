<template>
    
    <div class="legend-wms">
        
        <checkbox v-model="visible" @change="toggle_visible"> 
            <div class="label-content">
                <span>{{params.content.title}}</span>
                <div class="image">
                    <img :src="params.content.image" alt="">
                </div>
            </div>
        </checkbox>
        
        
        
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
            //padding-left: 2.4rem;
            padding-right: .4em;
            img{
                max-width:150px;
                width: initial;
            }
        }

        .label-content{
                display: flex;
            flex-direction: row-reverse;
            flex-wrap: wrap;
            justify-content: flex-end;
            align-items: center;
        }
    }
</style>