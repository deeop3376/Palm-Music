<template>
  <div class="playface">
    <div class="playTop">
      <span class="w100 ml-3 back" @click="goPre">
        <i class="iconfont icon-back"></i>
      </span>
      <div class="d-flex jc-center flex-wrap mb-3 pb-3 pt-3" style="text-align:center">
        <span class="w100 text-lg">{{songInfo.songName}}</span>
        <span class="mt-2">{{songInfo.singer}}</span>
      </div>
    </div>
    <div class="lyric">
      <loading v-if="isLoading" />
      <Scroll :list="songInfo.lyricArr" ref="scroll" :top="0" :ele="ele">
        <ul style="margin-top:50px; text-align:center">
          <li
            v-for="(item,i) in songInfo.lyricArr"
            :key="i"
            :class="`w100 d-flex jc-center mt-3 text-md ${lyricIndex==i?'active':''}`"
            ref="lyricLine"
          >{{item.content}}</li>
        </ul>
      </Scroll>
    </div>
    <div class="playBottom">
      <audio
        @canplay="audioLoaded"
        controls
        :src="songInfo.songSrc"
       hidden="true"
        ref="audio"
        @durationchange="dc"
      ></audio>
      <div class="d-flex jc-center mt-3 ai-center">
        <span>{{Math.floor(currentTime/60)}}:{{Math.round(currentTime-Math.floor(currentTime/60)*60)}}</span>
        <progress :value="progressValue" max="100"></progress>
        <span>{{durationTime.minute}}:{{durationTime.second}}</span>
      </div>
      <div class="icontool d-flex jc-around">
        <i  class="iconfont icon-loop-play"></i>
        <i @click="preSong" class="iconfont icon-previous-song"></i>
        <i v-if="!audioReady" class="loading"></i>
        <span v-if="audioReady">
          <i @click="playSong" v-if="!isPlay" class="iconfont icon-song-play"></i>
          <i @click="pauseSong" v-else class="iconfont icon-song-pause"></i>
        </span>
        <i @click="nextSong" class="iconfont icon-next-song"></i>
        <i @click="collectionSong" :class="`iconfont ${ songInfo.isCollection==true?'icon-red-heart':'icon-heart' }`"></i>
      </div>
    </div>
  </div>
</template>
<script>
import Scroll from "@/components/common/Scroll";
import loading from "@/components/common/loading";
export default {
  name: "",
  components: {
    Scroll,
    loading
  },
  data() {
    return {
      songSrc: "",
      isPlay: false,
      songId: "",
      lyricArr: [],
      songName: "",
      singer: "",
      lyricIndex: 0,
      timer: null,
      ele: null,
      progressValue: 0,
      songInfo: {},
      isLoading: true,
      currentTime: 0,
      duration: 0,
      audioReady:false,
      playTime:{
        minute:0,
        second:0
      },
      durationTime:{
        minute:0,
        second:0
      },
      songCanPlay:false,
      pushCount:-1  //代表router前进的步数，this.$router.push(pushCount),由于nextSong和preSong会改变router，所以每改变一次，pushCount减一
    };
  },
  created() {

   this.getSongInfo()
    
  },
  mounted() {},
  methods: {
    getSongInfo(){
          this.songId = this.$route.query.songId;
      this.songInfo.lyricArr = [];
    if (window.localStorage.getItem(this.songId)) {
      //如果本地存储中有该歌曲的信息，则从本地读取歌曲信息
      this.songInfo = JSON.parse(window.localStorage.getItem(this.songId));
      // console.log(this.songInfo);
      this.isLoading = false;
    } else {
      //如果本地没有该歌曲的信息则向服务器请求该歌曲信息
      this.$store.commit("setSongId", { songId: this.songId });

      this.$store.dispatch("fetchSongInfo").then(() => {
        
        this.songInfo = { 
          songSrc: this.$store.state.songUrl,
          singer: this.$store.state.singer,
          songName: this.$store.state.songName,
          lyricArr: this.$store.state.songContent,
          songId: this.songId,
          isCollection:false
        };
console.log(this.songInfo)
        if(this.songInfo.lyricArr.length==0){
        this.songInfo.songName=this.$route.query.songName;
        this.songInfo.singer=this.$route.query.singer;
        this.songInfo.lyricArr=[{content:'纯音乐，请欣赏'}],
        this.$store.commit('setSongInfo',{songName:this.songInfo.songName,singer:this.songInfo.singer})
        }
        this.isLoading = false;
        
      });
    }
    },
    collectionSong(){
      //isCollection默认为false，每次点击心，都对其进行取反
        this.songInfo.isCollection=!this.songInfo.isCollection
        //当isCollection为true时
       if(this.songInfo.isCollection){
         //将歌曲信息存入localStorage
          window.localStorage.setItem(this.songId,JSON.stringify(this.songInfo))  
          //collectionList是一个数组，其中存放的是所收藏歌曲的id  
        if(window.localStorage.getItem('collectionList')){
          let collectionList=JSON.parse(window.localStorage.getItem('collectionList'))
          if (!collectionList.includes(this.songId)){
            collectionList.push(this.songId)
            window.localStorage.setItem('collectionList',JSON.stringify(collectionList))
          }
          
        }else{
          let collectionList=[]
          collectionList.push(this.songId)
          window.localStorage.setItem('collectionList',JSON.stringify(collectionList))
        }
       }else{
         //当isCollection为false时，从localStorage中将该歌曲的isCollection改为false
         //并从localStorage中的collectionList中删除该歌曲的id
         window.localStorage.setItem(this.songId,JSON.stringify(this.songInfo))
         let collectionList=JSON.parse(window.localStorage.getItem('collectionList'))
         let deleteIndex=0
          for(let i=0;i<collectionList.length;i++){
            if(this.songId===collectionList[i]){
              deleteIndex=i
              console.log(deleteIndex)
              break;
            }
          }
          collectionList.splice(deleteIndex,1)
           window.localStorage.setItem('collectionList',JSON.stringify(collectionList))
       }
    },
    dc(){
      // alert(this.$refs.audio.duration)
    },
    audioLoaded() {
      this.duration = this.$refs.audio.duration;
      this.audioReady=true
      this.durationTime.minute=Math.floor(this.duration/60)
      this.durationTime.second=Math.round(this.duration-this.durationTime.minute*60)    
    },
    goPre() {
      this.$router.go(this.pushCount);
      this.pauseSong();
    },

    playSong() {
      if(this.audioReady){
        this.$refs.audio.play();
      this.isPlay = true;

      if (!window.localStorage.getItem(this.songId)) {
        //如果歌曲是第一次播放则将歌曲信息存入本地
        window.localStorage.setItem(this.songId, JSON.stringify(this.songInfo));
        if(window.localStorage.getItem('playList')){
          let playList = JSON.parse(window.localStorage.getItem("playList"));
          playList.push(this.songId);
          //将歌曲id存入播放历史列表
          window.localStorage.setItem("playList", JSON.stringify(playList));
        }else{
          let playList=[]
          playList.push(this.songId)
          window.localStorage.setItem("playList", JSON.stringify(playList));
        }
        
      }else{
        if(window.localStorage.getItem('playList')){
          let playList = JSON.parse(window.localStorage.getItem("playList"));
          if(!playList.includes(this.songId)){
            playList.push(this.songId);
          //将歌曲id存入播放历史列表
            window.localStorage.setItem("playList", JSON.stringify(playList));
          }
        }else{
          let playList=[]
          playList.push(this.songId)
          window.localStorage.setItem("playList", JSON.stringify(playList));
        }
      }

      this.autoLyric();
      }else{
        alert('正在缓冲')
      }
    },
    pauseSong() {
      this.$refs.audio.pause();
      this.isPlay = false;
      clearInterval(this.timer);
    },
    nextSong() {
      
      let playList=this.$store.state.songList
      let nowSongIndex=0
      for(let i=0;i<playList.length;i++){
        if(playList[i].songId==this.songId){
          nowSongIndex=i
          break;
        }
      } 
      if(nowSongIndex!=playList.length-1){
        this.songId=playList[nowSongIndex+1].songId
        let songId=playList[nowSongIndex+1].songId
        let songName=playList[nowSongIndex+1].songName
        let singer=playList[nowSongIndex+1].singer
        this.$router.push(
        "/play?songId=" +
          songId +
          "&&songName=" +
          songName +
          "&&singer=" +
          singer
      );
      this.getSongInfo()
      this.pushCount-=1
      clearInterval(this.timer);
          this.progressValue = 0;
          this.pauseSong();
          this.ele = this.$refs.lyricLine[6];
          this.$refs.scroll.scrollToElement(); //歌词滚动到前面
          this.currentTime=0
          this.lyricIndex=0
      }else{
        alert('this is last one')
      }

        
    },
    preSong() {
 let playList=this.$store.state.songList
      let nowSongIndex=0
      for(let i=0;i<playList.length;i++){
        if(playList[i].songId==this.songId){
          nowSongIndex=i
          break;
        }
      } 
      if(nowSongIndex!=0){
        this.songId=playList[nowSongIndex-1].songId
        let songId=playList[nowSongIndex-1].songId
        let songName=playList[nowSongIndex-1].songName
        let singer=playList[nowSongIndex-1].singer
        this.$router.push(
        "/play?songId=" +
          songId +
          "&&songName=" +
          songName +
          "&&singer=" +
          singer
      );
      this.getSongInfo()
      this.pushCount-=1
      clearInterval(this.timer);
          this.progressValue = 0;
          this.pauseSong();
          this.ele = this.$refs.lyricLine[6];
          this.$refs.scroll.scrollToElement(); //歌词滚动到前面
          this.currentTime=0
          this.lyricIndex=0
      }else{
        alert('this is first one')
      }

    },
    autoLyric() {
      // console.log("137");
      let duration = this.$refs.audio.duration;
      //  let percentTime=duration/100
      if (this.timer) {
        clearInterval(this.timer);
      }
      const self = this;
      this.timer = setInterval(function() {
        // console.log(currentTime)
        if (self.currentTime >= duration) {
          //播放完毕
          clearInterval(self.timer);
          self.progressValue = 0;
          self.pauseSong();
          self.ele = self.$refs.lyricLine[6];
          self.$refs.scroll.scrollToElement(); //歌词滚动到前面
          self.lyricIndex=0
          self.currentTime=0
          // console.log("end");
          return;
        }

        self.currentTime = self.$refs.audio.currentTime;
        
        //进度条的值为歌曲当前时间/歌曲总长度*100
        self.progressValue = (self.currentTime / duration) * 100;
        for (let i = 0; i < self.songInfo.lyricArr.length; i++) {
          if (i == self.songInfo.lyricArr.length - 1) {
            if (
              Math.round(self.currentTime) >=
              self.songInfo.lyricArr[i].minute * 60 +
                self.songInfo.lyricArr[i].second
            ) {
              self.lyricIndex = i;
              if (i >= 8) {
                //播放至第8行的歌词时，开始滚动，确保当前播放的歌词始终处于屏幕中央
                //    self.$refs.scroll.scrolly()
                self.ele = self.$refs.lyricLine[i];
                self.$refs.scroll.scrollToElement();
              }
            }
          } else {
            if (
              Math.round(self.currentTime) >=
                self.songInfo.lyricArr[i].minute * 60 +
                  self.songInfo.lyricArr[i].second &&
              Math.round(self.currentTime) <
                self.songInfo.lyricArr[i + 1].minute * 60 +
                  self.songInfo.lyricArr[i + 1].second
            ) {
              self.lyricIndex = i;
              if (i >= 8) {
                //    self.$refs.scroll.scrolly()
                self.ele = self.$refs.lyricLine[i];
                //滚动到self.$refs.lyricLine[i]，即让self.$refs.lyricLine[i]处于滚动区域的中间
                self.$refs.scroll.scrollToElement();
              }
            }
          }
        }
      }, 500);
    },

  },
  beforeDestroy() {
    // console.log("destoryedddd");
    this.$store.commit('setCurrentTime',{currentTime:this.currentTime})
    this.pauseSong();
  }
};
</script>
<style scoped>
.playface {
  background-image: linear-gradient(to bottom right, gray, lightblue);
  width: 100%;
  height: 100%;
  border: 0px solid gray;
}
progress {
  width: 70%;
  height: 5px;
  color: #f00;
  background-color: #efeff4;
  border-radius: 3px;
}
progress::-webkit-progress-bar {
  background-color: gray;
  border-radius: 4px;
}
progress::-webkit-progress-value {
  background-color: #a21211;
  border-radius: 4px;
}
.active {
  color: blue;
}
.icon-red-heart{color:red;}
.back{position: relative;top:10px;}
.icontool{width:80%;margin:0 auto;margin-top:10px;}
.iconfont{font-size: 30px;}
.icon-back{font-size: 20px;}
.lyric{height:calc(100vh - 260px);position:relative;top:0px;margin:0 auto;padding-bottom:2px;
width: 90%;}
.loading{width: 30px;height: 30px;border:2px solid gray;display: block;
border-radius: 50%;border-right: none;border-top:none;animation: loading 2s infinite linear;}
@keyframes loading{
    50%{
        transform: rotate(180deg)
    }
    100%{
        transform: rotate(360deg)
    }
}
</style>