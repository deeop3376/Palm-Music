<template>
<div class='music-list'>
    <ul>
        <li 
        class="d-flex flex-wrap ai-center border-b border-t py-2 pl-3"
        v-for="(item,i) in musicList" :key="item.songId"
        @click="goPlay(item.songId,item.songName,item.singer[0].name)"
        >
            <div style="width:30px;">
                <span class="mr-4">{{i+1}}</span>
            </div>
            <div class="d-flex flex-wrap ai-center songInfo">
                <span class="text-hidden w100">{{item.songName}}</span>
                <span class="text-hidden w100">
                    <span 
                    class="text-gray2 text-xs"
                   
                    >
                    {{item.singer[0].name}}
                    <!-- <span v-if="item.singer.length>1 && i<item.singer.length-1">&</span> -->
                    
                    </span>
                </span>
            </div>
        </li>

    </ul>
</div>
</template>

<script>

export default {
name:'musiclist',
components: {},
data() {
return {

}
},
props: {
    musicList:{
        type:Array,
        required:true
    }
},
watch: {},
methods: {
    goPlay(songId,songName,singer){
        
        
        this.$router.push('/play?songId='+songId+'&&songName='+songName+'&&singer='+singer)
    },
},
}
</script>
<style scoped>
.music-list{border-radius: 10px;position: relative;top: 0px;z-index: 4;background-color: white;}
.text-hidden{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.songInfo{width:calc(100vw - 60px)}
</style>