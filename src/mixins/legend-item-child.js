export default {
    props:["params"],
    data:function(){
        return{
            visible:false,
            layerId:""
        }
    },
    methods:{
        _toggle_visible:function(){
            this.$parent.$parent.cmpMap.cmpLayers[this.layerId].olLayer.setVisible(this.visible)
        }
    },
    created:function(){
        this.layerId= this.$parent.layerId
        this.visible= this.$parent.$parent.cmpMap.cmpLayers[this.layerId].visible;

        let vm = this;
        this.$parent.$parent.cmpMap.cmpLayers[this.layerId].$on("update:visible",function(newValue){
            if(vm.visible!=newValue){
                
                vm.visible = newValue
            }
            
        })
    }
}