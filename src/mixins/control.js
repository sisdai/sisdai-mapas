
export default{
    inject:["getComponentMap"],
    created:function(){
        this.cmpMap = this.getComponentMap()
    },
    data:function(){
        return{
            cmpMap:undefined
        }
    }
}