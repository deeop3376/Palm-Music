<template>
<div class='singerSongList'>
    <loading v-if="isLoading"  />
    <div class="songSheetBg w100 " style="height:300px;overflow:hidden">
       <div class="pos-a text-white pl-3 pt-3">
           <span @click="goPre"><i class="iconfont icon-back"></i></span>
          <div  style="position:relative;top:200px;left:0px;" class="d-flex flex-wrap">
               <span class="w100 mb-2">{{singer}}</span>
                
          </div>
       </div>
        <img :src="singer_pic" alt="" class="w100" @load="imgLoad">
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
import api from '@/api'
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
    singer_mid:'',
    songSheetInfo:{},
    songList:[],
    singer:'周杰伦',
    isLoading:true,
    singer_pic:''
}
},

created(){
    this.singer_mid=this.$route.query.mid
    this.singer_pic=this.$route.query.singer_pic
    
   this.getSingerSongList()
   
},
methods: {
    goPre(){
        this.$router.go(-1)
    },
    imgLoad(){
        this.$refs.scroll.refresh()
    }, 
   async getSingerSongList(){
       const res= await api.getSingerSongList(this.singer_mid)
       
            this.singer=res.data.data.list[0].singer[0].name,  //singer是一个对象数组，形如：singer:[{id:4558,mid：'ajkd99',name:'周杰伦'}]
            this.songList=res.data.data.list.map(item=>({
                songName:item.name,
                singer:item.singer,
                songId:item.mid
            }))
             this.$store.commit('setSongList',{songList:this.songList})
           this.isLoading=false
       
    }
},
}
</script>
<style scoped>
/* .scroll-wrapper{position: relative;top:-20px;} */
/* .musiclist{position: relative;top:0;} */

.mlist{position: relative;top:0;height: calc(100vh - 360px)}
</style>