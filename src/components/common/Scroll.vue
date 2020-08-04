<template>
<div class='wrapper' ref="wrapper">
    <slot></slot>
</div>
</template>

<script>
import BScroll from '@better-scroll/core'
export default {
name:'',
methods: {
    initScroll(){
        this.$refs.wrapper.style.top=this.top+'px'
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:this.click
        })
    },
    refresh(){
        this.scroll.refresh()
    },
    scrolly(){
        this.scroll.scrollBy(0,0,500)
    },
    scrollToElement(){
        if(this.ele){
            
            this.scroll.scrollToElement(this.ele,500,true,true)
        }
        
    }
},
mounted(){
    this.initScroll()
    if(this.list.length>0){this.refresh()}
},
props:{
    ele:{
        type:HTMLLIElement,
        default:null
    },
    top:{
        type:Number,
        default:0
    },
    list:{
        type:Array,
        required:true
    },
    click:{
        type:Boolean,
        default:true
    }
},
watch:{
    list(){
        
        // if(this.list.length>0){this.refresh()}
        this.$nextTick(()=>{
           
            this.refresh()
        })
    }
}
}
</script>
<style>
.wrapper{
    position: absolute;
    overflow: hidden;
    top:0;
    right: 0;
    bottom: 0;
    left:0;
}
</style>