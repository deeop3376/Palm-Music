<template>
<div class='main-header'>
    <div class="top-header pos-r t-0">
        <div class="title text-primary text-lg text-weight-7 text-center">
            {{title}}
        </div>
        <div class="pos-a top-0 pl-3 text-lg"
        @click="showMy">
           <i class="iconfont icon-user"></i> 
        </div>
    </div>
    <div class="nav-list">
        <ul class="d-flex jc-around py-3 text-md text-primary">
            <li v-for="item of navList" :key="item.name"
            :class="{ 'nav-active': item.path === $route.path }"
            @click="navClick(item.path)">
                {{item.name}}
            </li>
        </ul>
    </div>
</div>
</template>

<script>

export default {
name:'',
components: {},
data() {
return {
    navList:[
        {path:'/recommend',name:'推荐'},
        {path:'/singer',name:'歌手'},
        {path:'/rank',name:'排行'},
        {path:'/search',name:'搜索'}
    ]
}
},
props:{
    title:{
        type:String,
        default:'Function Music'
    }
},
methods:{
    navClick(path){
        this.$emit('nav-click',path)
    },
    showMy(){
        this.$router.push('/my')
    }
}
}
</script>
<style scoped>
.icon-user{font-size: 23px;}
.main-header{width:100%;}
</style>