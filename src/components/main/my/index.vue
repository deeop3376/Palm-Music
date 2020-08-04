<template>
  <div class="main">
    <div class="my-top d-flex jc-center ai-center">
      <div class="icon pos-a top-0 left-0 text-lg mt-2 ml-2" @click="goBack">
          <i class="iconfont icon-back"></i>
      </div>
      <div class="option">
        <span @click="getCollectionList" :class="`pad mr-3 ${isCollection==true?'active':''}`">我的收藏</span>
        <span @click="historyPlay" :class="`pad ml-3 ${isCollection==true?'':'active'}`">播放历史</span>
      </div>
    </div>
    <div class="musicList">
        <Scroll :list="musicList">
            <div class="history-list">
            <ul>
                <li
                class="d-flex flex-wrap ai-center border-b border-t py-2 pl-3"
                v-for="(item,i) in musicList"
                :key="item.songId"
                @click="goPlay(item.songId)"
                >
                <div style="width:30px;">
                    <span class="mr-4">{{i+1}}</span>
                </div>
                <div class="d-flex flex-wrap ai-center songInfo">
                    <span class=" w100">{{item.songName}}</span>
                    <span class="w100 text-gray2 text-xs">
                        {{item.singer}}
                    </span>
                </div>
                <div v-if="isCollection ==true"  class="operate">
                    <i class="iconfont icon-red-heart"></i>
                </div>
                </li>
            </ul>
        </div>
        </Scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '@/components/common/Scroll'
export default {
  name: "",
  components: {Scroll},
  data() {
    return {
        musicList:[],
        isCollection:true
    };
  },
  created() {
     this.getCollectionList()
  },
  watch: {},
  methods: {
      goBack(){
          this.$router.go(-1)
      },
      goPlay(songId){
          this.$router.push('/play?songId='+songId)
      },
      getCollectionList(){
          this.isCollection=true
          this.musicList=[]
           if(window.localStorage.getItem('collectionList')){         
                let collectionList=JSON.parse(window.localStorage.getItem('collectionList'))
                for(let i=0;i<collectionList.length;i++){
                    this.musicList.unshift(JSON.parse(window.localStorage.getItem(collectionList[i])))
                }
            }
      },
      historyPlay(){
          this.isCollection=false
          this.musicList=[]
          let historyList=JSON.parse(window.localStorage.getItem('playList')) || []
          for(let i=0;i<historyList.length;i++){
              this.musicList.unshift(JSON.parse(window.localStorage.getItem(historyList[i])))
          }
      }
  }
};
</script>
<style scoped>
.my-top{height: 50px;background-color: #1a73e8;color:white;}
.pad{padding:0px 5px 3px 5px;}
.active{border-bottom: 2px solid white;}
.songInfo{width:calc(100vw - 90px);}
.operate{color:red;}
.musicList{position: relative;top:0;height: calc(100vh - 50px);}
</style>