
export default{
    inject:["getComponentMap"],
    created:function(){
        //this.cmpMap = this.getComponentMap()
        this._getMapComponentFromParent((mapComponent)=>{
            this.cmpMap = mapComponent
            setTimeout(()=>{
                this.$emit("readyCmpMap", this.cmpMap)
            },100)
            
        })
        
    },
    methods:{
        _getMapComponentFromParent:function(found){
            var vm = this
            function checkForComponentMap () {
                if (vm.getComponentMap()) {
                    found(vm.getComponentMap())
                } else {
                    setTimeout(checkForComponentMap, 50)
                }
            }
            checkForComponentMap()
        },
        _emitAccesorEvents: function (eventName,newValue){
            let vm = this;
            //ejemplo de accesors=>   #map , #layers   #layer[nombre]
            for (const key in vm.$listeners) {
                if(key.indexOf(eventName+":")==0){
                    let accesor = key.split(":")[1]
                    //console.log(accesor,newValue)
                    if(accesor == "#map"){
                        vm.$emit(key,{value:newValue,target:vm.cmpMap})
                    }
                    if(accesor == "#layers"){
                        vm.$emit(key,{value:newValue,target:vm.cmpMap.cmpLayers})
                    }
                    if(accesor.indexOf("#layer[") == 0){
                        let layername = accesor.match(/\[(.*)\]/i)[1]
                        
                        vm.$emit(key,{value:newValue,target:vm.cmpMap.cmpLayers[layername]})
                    }
                }
            }
        }
    },
    data:function(){
        return{
            cmpMap:undefined
        }
    }
}