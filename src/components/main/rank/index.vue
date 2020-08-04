<template>
<div class='main'>
    <loading v-if="isLoading"  />
    <div class="songSheetBg w100 " style="height:300px;overflow:hidden">
       <div class="pos-a text-white pl-3 pt-3">
           <span @click="goPre"><i class="iconfont icon-back"></i> 排行榜</span>
          <!-- <div  style="position:relative;top:200px;left:0px;" class="d-flex flex-wrap">
               <span class="w100 mb-2">{{songSheetInfo.dissname}}</span>
                <span class="text-xs text-gray1">
                   播放量： {{songSheetInfo.playNum}}
               </span>
          </div> -->
       </div>
        <img :src="picUrl" alt="" class="w100" @load="imgLoad">
    </div>
       <div class="mlist">
           <Scroll :list="songList" ref="scroll" :top="0" class="scrollwraper">       
                <music-list :music-list="songList" />        
            </Scroll>
       </div>
    <div class="miniplayer">
        <miniplay  />
    </div>
</div>
</template>

<script>
import musicList from '@/components/main/musiclist'
import loading from '@/components/common/loading'
import Scroll from '@/components/common/Scroll'
import miniplay from '@/components/main/play/MiniPlay'
export default {
name:'songSheetInfo',
components: {
    musicList,
    loading,
    Scroll,
    miniplay
},
data() {
return {
    rankId:'',
    songSheetInfo:{},
    songList:[],
    picUrl:'',
    isLoading:true,
    
}
},

created(){
    this.rankId=this.$route.query.id
    this.picUrl=this.$route.query.picUrl
    this.fetchSongSheetInfo()
   
},
methods: {
    goPre(){
        this.$router.go(-1)
    },
    imgLoad(){
        this.$refs.scroll.refresh()
    },
    
   async fetchSongSheetInfo(){
       if(this.songSheetId!=''){
           const result=await this.$http.get('/top?id='+this.rankId)
           
           
            this.songList=result.data.data.list.map(item=>({
                songName:item.name,
                singer:item.singer,
                songId:item.mid
            }))
            this.$store.commit('setSongList',{songList:this.songList})
           this.isLoading=false
       }
       
    }
},
}
</script>
<style scoped>
/* .scroll-wrapper{position: relative;top:-20px;} */
/* .musiclist{position: relative;top:0;} */

.mlist{position: relative;top:0;height: calc(100vh - 360px)}
</style>