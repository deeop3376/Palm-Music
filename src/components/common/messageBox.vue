<template>
<div v-if="display" class='messageBox'>
    {{message}}
</div>
</template>

<script>

export default {
name:'',
components: {},
data() {
return {
    display:false,
    timer:null
}
},
props: {
    message:{
        type:String,
        default:'this is a messageBox'
    },
    isDisplay:{
        type:Boolean,
        default:false
    }
},
watch: {
    isDisplay(){
        this.display=true
        clearTimeout(this.timer)
        this.timer= setTimeout(()=>{
            this.display=false
        },2000)
    
    }
},
methods: {

},
}
</script>
<style scoped>
.messageBox{position: absolute;top:-100px;left:50%;text-align:center;line-height:36px;width: 150px;height:36px;
font-size: 15px;background-color: brown;color: white;transform: translate(-50%,-50%);
z-index: 1000;}
</style>