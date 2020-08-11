<template>
<div class='main'>
    <main-header 
    title="Palm Music" 
    @nav-click="toPath"/>
    <!-- <transition :name="tName"> --> 
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    <!-- </transition> -->
    <miniPlayer /> 
</div>
</template>  

<script>
import MainHeader from '@/components/main/MainHeader'
import miniPlayer from '@/components/main/play/MiniPlay'
export default {
name:'Main',
components: {
    MainHeader,
    miniPlayer
},
data() {
return {
    // tName:''
}
},
// watch:{
//     $route(to,from){
//         console.log('aaaa')
//         console.log(from.path)
//         console.log(to.path)
//     }
// },
methods: {
    toPath(path){
        this.$router.push(path)
    }
},
}
</script>
<style scoped> 
/* .main{width:100%;max-width:1024px;}  */
</style>