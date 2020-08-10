<template>
<div class='main'>
    <main-header 
    title="Palm Music" 
    @nav-click="toPath"/>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
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

}
},
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