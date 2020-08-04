<template>
<div class='main'>
    <main-header 
    title="Function Music" 
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
.main{max-width: 720px;margin:0 auto;}
</style>