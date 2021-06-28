import GeoJSON from 'ol/format/GeoJSON';

export default {
    props:["params"],
    data:function(){
        return{
            visible:false,
            layerId:"",
            hasSubfilters:false,
            visibleStatusFilters:[]
        }
    },
    methods:{
        toggle_visible:function(){
            this.$parent.$parent.cmpMap.cmpLayers[this.layerId].olLayer.setVisible(this.visible)
            this.$emit("toogle_visible",this.visible)
        },
        toggle_allSubFilters:function(){
            let apagar_todos = this.visibleStatusFilters.some(item=>item)
            this.$emit("toogle_allsubfilters",apagar_todos)
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
        this.visibleStatusFilters = [this.visible]

        let vm = this;
        this.$parent.$parent.cmpMap.cmpLayers[this.layerId].$on("update:visible",function(newValue){
            if(vm.visible!=newValue){
                
                vm.visible = newValue
            }
            
        })
    },
    watch:{
        "visible":function(older,newer){
            console.log(older,newer)
        },
        "visibleStatusFilters":function(newerValue){
            //console.log(newerValue,console.log(this.$parent))
            if(!this.hasSubfilters){
                return ;
            }
            this.$parent.$parent.labelToogleAll = newerValue.some(item=>item) ? "Quitar todos" : "Encender Todos"
            
        }
    }
}