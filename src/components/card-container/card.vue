<template>
    <div class="card-map-container" 
        :class="{'without-footer': !hasFooter,'collapsed':collapsingClass}"
        :style="{'max-height':collapsingHeight}">
        <div class="card-map-header">
            <slot name="header"></slot>
        </div>
        <slot></slot>
        <div class="card-map-footer" v-if="hasFooter">
            <slot name="footer"></slot>
            <button class="collapsable-button" @click="collapsed_=!collapsed_">
                {{collapsed_? '+' : '-'}}
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name:"DaiCardMapContainer",
    props:{
        collapsed:{
            type: Boolean,
            default:true
        },
        collapsedHeight:{
            type:String,
            default:"80vh"
        }
    },
    data:function(){
        return {
            cmpMap:null,
            hasFooter:false,
            collapsed_:true
        }
    },
    created:function(){
        this.collapsed_ = this.collapsed;
    },
    computed:{
        collapsingClass:function(){
            return this.hasFooter && this.collapsed_;
        },
        collapsingHeight:function(){
            return this.hasFooter && this.collapsed_ ? this.collapsedHeight : "250vh"
        }
    },
    mounted:function(){
        this.hasFooter = this.hasFooterSlot()
    },
    methods:{
        hasFooterSlot() {
            return !!this.$slots.footer
        },
        _registerMap(mapComponent){
            this.cmpMap = mapComponent;
        },
        _getComponentMap:function(){
            return this.cmpMap
        }
        
    },
    provide:function(){
        return{
            getComponentMap:this._getComponentMap
        }
    }
}
</script>

<style lang="scss">
.card-map-container{
    border-radius: 8px;
    background-color: white;
    padding: .6rem .3rem 0rem .3rem;
    border: 1px solid black;
    overflow-y: clip;
    position: relative;
    transition: max-height 0.30s ease-in;
    &.without-footer{
        padding-bottom: 5px;
        
    }
    .dai-map-container{
        margin-left: -.5rem;
        margin-right: -.5rem;
        margin-top: .5rem;
    }
    .card-map-header{
        display: flex;
        flex-wrap: wrap;
        *{
            margin: .3rem;
            flex-grow: 1;
        }
    }

    .card-map-footer{
        padding-bottom: 1.8rem;
        .collapsable-button{
            width: 100%;
            //width: calc(100% + 1rem);
            background-color: black;
            color: white;
            margin-left: -.5rem;
            margin-right: -.5rem;
            border-style: none;
            border-radius: 0 0 8px 8px;
            cursor: pointer;
            font-size: 18px;
            height: 1.8rem;
            position: absolute;
            bottom: 0px;
        }
    }
}
</style>