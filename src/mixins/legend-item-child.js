import GeoJSON from 'ol/format/GeoJSON';

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
        },
        _filter_features:function(fnCompare = ()=>true){
            let geojsonFormat = new GeoJSON()
            let allFeatureslayer = geojsonFormat.readFeatures( this.$parent.$parent.cmpMap.cmpLayers[this.layerId].VM_allFeatures);
            let source = this.$parent.$parent.cmpMap.cmpLayers[this.layerId].olLayer.getSource()
            let nuevosFeatures= allFeatureslayer.filter(fnCompare)
            //console.log(nuevosFeatures)
            source.clear()
            source.addFeatures(nuevosFeatures)
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