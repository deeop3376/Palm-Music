<template>
<div class='main'>
    <ul>
        <li class="d-flex ai-center px-2 py-3"
         v-for="singer of list" :key="singer.singer_id"
         @click="getSingerSong(singer.singer_mid,singer.singer_pic)">
            <img v-lazy="singer.singer_pic" alt="singerImg" style="width:60px;border-radius:50%;">
            <span class="pl-3 text-gray2">{{singer.singer_name}}</span>
        </li>
    </ul>
</div>
</template>

<script>

export default {
name:'',
components: {},
props:{
    list:{
        type:Array,
        required:true
    }
},
created(){
    
},
methods:{
    getSingerSong(mid,pic){
        
        this.$router.push('/singerSongList?mid='+mid+'&&singer_pic='+pic)
    }
}
}
</script>
