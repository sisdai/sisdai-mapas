<template>
    
    <div class="legend-normal-vector">
        
        <!--TOdo lo que va adentro de checkbox es el label del mismo -->
        <checkbox v-model="visible" @change="set_visible_to_layer">
            <shape class="simbologia"
                :shapeType="classShape"
                :backgroundColor="params.content.fill_color || 'gray'" 
                :strokeColor="params.content.stroke_color || 'white'"
                :strokeWidth="params.content.stroke_width || 1"
                :size="[25,25]" 
            />
                
            <span>{{params.content.title}}</span>
        </checkbox>
        
    </div>
</template>

<script>
import checkbox from "../utils/checkbox"
import shape from "../utils/shape.vue"
import legend_item_child  from "../../mixins/legend-item-child"
export default {
    mixins:[legend_item_child],
    components:{
        checkbox,shape
    },computed:{
        classShape:function(){
            return this.params.content.shape.startsWith("svg:") ? '' : this.params.content.shape  
        }
    }
}
</script>

<style lang="scss" scoped>
    .legend-normal-vector{
      .simbologia{
          
          margin-right: .4em;
          
      }  
        
    }
</style>