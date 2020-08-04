<template>
<div class='song-sheet-list'>
    <ul>
        <li
        v-for="item of hotSong"
        :key="item.id"
        class="d-flex pb-3"
        @click="goSongSheetInfo(item.id)"
        >
            <img v-lazy="item.img" style="width:60px;height:60px;" alt="">
            <div class="right d-flex flex-wrap pl-3 ai-center">
                <span class="w100">{{item.title}}</span>
                <span class="text-gray2">{{item.info}}</span>
            </div>
        </li>
    </ul>
</div>
</template>

<script>

export default {
name:'',
components: {},
data() {
return {

}
},
props:{
    hotSong:{
        type:Array,
        required:true
    }
},
methods:{
    goSongSheetInfo(id){
       this.$router.push('/songSheetInfo?id='+id)
    }
}
}
</script>
<style scoped>

</style>