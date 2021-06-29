<template>
    
    <div class="legend-normal-vector">
        
        <!--TOdo lo que va adentro de checkbox es el label del mismo -->
        <checkbox v-model="visible" @change="set_visible_to_layer">
                <span v-if="classShape!=''" class="simbologia" 
                    :class="classShape" 
                    :style="{'background-color':params.content.fill_color,'border-color':params.content.stroke_color}" ></span>
                <span>{{params.content.title}}</span>
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
          width: 25px;
          height: 25px;
          margin-right: .4em;
          border-width: 1px;
          border-style: solid;
          &.circle{
              
              border-radius: 50%;
          }
      }  
        
    }
</style>