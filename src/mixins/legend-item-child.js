import GeoJSON from 'ol/format/GeoJSON';

export default {
    props:["params"],
    data:function(){
        return{
            visible:false,
            layerId:"",
            hasSubfilters:false,
            visibleStatusFilters:[],
            VM_skip_first_toogle :false
        }
    },
    methods:{
        set_visible_to_layer:function(){
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
        },
        _initLegend:function(){
            //Implementar en cada leyenda si es necesario
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
        "visible":function(newerValue){
            this.$parent.$parent.checkLabelToggleAll();
            if(this.hasSubfilters){
                if(!this.VM_skip_first_toogle && paramsIncludeInitialFilters(this.params)[0] ){
                    this.list_filter = paramsIncludeInitialFilters(this.params)[1]
                    //console.log(this.list_filter,"a poner inicialmente")
                    this._filtrarCapa()
                }

                if(this.VM_skip_first_toogle){
                    let apagar_todos = !newerValue;
                    this.$emit("toogle_allsubfilters",apagar_todos)
                }
                

            }

            this.VM_skip_first_toogle = true;
        },
        "visibleStatusFilters":function(newerValue){
            //console.log(newerValue,console.log(this.$parent))
            if(!this.hasSubfilters){
                return ;
            }
            this.$parent.$parent.labelToogleAll = newerValue.some(item=>item) ? "Quitar todos" : "Mostrar todos"
            this.$parent.$parent.algunoActivo = newerValue.some(item=>item) 
            
        },
        'params':function(){
            this._initLegend()
        }
    }
}

const paramsIncludeInitialFilters=(params)=>{
    //console.log(params)
    let cortes = params.content.cortes
    if(Array.isArray(cortes)){
        //buscar dentro de los elementos
        const clases_inicial= cortes.find(corte=>corte.args.clasesVisiblesInicial.length>0);
        let hayclases= clases_inicial != undefined
        let clasesReturn = hayclases ? cortes.cortes.map((item,idx)=>{
            return clasesInicial[idx]!=undefined  ? clasesInicial[idx] : true
        }) : []
        return [hayclases,clasesReturn]
    }

    let clasesInicial  = cortes.args.clasesVisiblesInicial
    let hayclases= clasesInicial.length ==0 ? false : true
    let clasesReturn = hayclases ? cortes.cortes.map((item,idx)=>{
        return clasesInicial[idx] !=undefined ? clasesInicial[idx] : true
    }) : []
    return [hayclases,clasesReturn]
}