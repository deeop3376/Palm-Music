<template>
<div class='songSheetInfo'>
    <loading v-if="isLoading"  />
    <div class="songSheetBg w100 " style="height:300px;overflow:hidden">
       <div class="pos-a text-white pl-3 pt-3">
           <span @click="goPre"><i class="iconfont icon-back"></i></span>
          <div  style="position:relative;top:200px;left:0px;" class="d-flex flex-wrap">
               <span class="text-shadow w100 mb-2">{{songSheetInfo.dissname}}</span>
                <span class="text-shadow text-xs text-gray1">
                   播放量： {{songSheetInfo.playNum}}
               </span>
          </div>
       </div>
        <img :src="songSheetInfo.logo" alt="" class="w100" @load="imgLoad">
    </div> 
   
       <div class="mlist">
           <Scroll :list="songList" ref="scroll" :top="0" class="scrollwraper">       
                <music-list :music-list="songList" />        
           </Scroll>
       </div>

        <miniplay  />
    
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
    songSheetId:'',
    songSheetInfo:{
        dissname:'',
        logo:'',
        playNum:0,
        songNum:0
    },
    songList:[],
   
    isLoading:true,
    
}
},

created(){
    this.songSheetId=this.$route.query.id
    
    this.fetchSongSheetInfo()
   
},
methods: {
    goPre(){
        this.$router.go(-1)
    },
    imgLoad(){
        this.$refs.scroll.refresh()
    },
    test(){
        this.testlogo='clcik'
    },
   async fetchSongSheetInfo(){
       if(this.songSheetId!=''){
           const result=await this.$http.get('/songlist?id='+this.songSheetId)
           this.songSheetInfo.dissname=result.data.data.dissname
           this.songSheetInfo.logo=result.data.data.logo
           this.songSheetInfo.playNum=result.data.data.visitnum
           this.songSheetInfo.songNum=result.data.data.total_song_num          
            this.songList=result.data.data.songlist.map(item=>({
                songName:item.songname,
                singer:item.singer,
                songId:item.songmid
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
.miniPlayer{position: relative;top:0;}
.text-shadow{text-shadow: 0px 0px 2px black;}
</style>