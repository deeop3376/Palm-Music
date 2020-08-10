<template>
  <div class="miniplayer d-flex jc-between">
    <div class="toggle" ref="to">
      <p v-if="playList.length==0" style="line-height:300px;text-align:center;">空空如也</p>
      <Scroll :list="playList" ref="scroll" :ele="ele">
        <ul>
          <li
            class="d-flex flex-wrap ai-center  py-2 pl-3"
            v-for="(item,i) in playList"
            :key="item.songId"
            @click="goPlay(item.songId,item.songName,item.singer[0].name)"
            ref="playlist"
          >
         
            <div style="width:30px;">
               
              <span class="mr-4">{{i+1}}</span>
             </div>
            <div class="d-flex flex-wrap ai-center songInfo">
              <span :class="`text-hidden w100  ${songId==item.songId?'green':''}`">{{item.songName}}</span>
              <span class="text-hidden w100">
                <span class="text-gray2 text-xs">
                  {{item.singer[0].name}}
                  <!-- <span v-if="item.singer.length>1 && i<item.singer.length-1">&</span> -->
                </span>
              </span>
            </div>
          </li>
        </ul>
      </Scroll>
    </div>
    <div class="infosong d-flex ai-center pos-r top-0" @click="goPlay1">
      <img src="@/assets/music.jpg" alt="song" class="img" ref="img" />
      <div class="play-left d-flex flex-wrap">
        <span class="text-hidden w100">{{songName}}</span>
        <span class="text-hidden w100 text-gray2">{{singer}}</span>
      </div>
    </div>
    <div class="songTool">
      <i v-if="!isPlaying" @click="playMusic" class="iconfont icon-song-play"></i>
      <i v-else @click="pauseMusic" class="iconfont icon-song-pause"></i>
      <i @click="getPlayList" class="iconfont icon-menu ml-2"></i>
    </div>
    <audio :src="songUrl" @ended="musicEnd" ref="audio" hidden="true"></audio>
    <messageBox :message="showMessage" :isDisplay="isDisplay" />
  </div>
</template>

<script>
import messageBox from "@/components/common/messageBox";
import Scroll from "@/components/common/Scroll";
export default {
  name: "",
  data() {
    return {
      isPlaying: false,
      songName: "",
      singer: "",
      songId:'',
      songUrl: "",
      currentTime: 0,
      isPaused: true,
      showMessage: "请先选择要播放的歌曲",
      isDisplay: false,
      playList: [],
      isToggle: false,
      ele:null
    };
  },
  components: {
    messageBox,
    Scroll
  },
  props: {},
  created() {
    // this.isPlaying=this.$store.state.isPlaying
    this.songName = this.$store.state.songName || "请选择要播放的歌曲";
    this.songId=this.$store.state.songId
    this.singer = this.$store.state.singer || " ";
    this.songUrl = this.$store.state.songUrl || "";
    this.currentTime = this.$store.state.currentTime;
   
  },
  methods: {
    goPlay1(){
      if(this.songId!=''){
        this.$router.push('/play?songId='+this.songId+'&&songName='+this.songName+'&&singer='+this.singer)
      }
    },
    goPlay(songId, songName, singer) {
      this.$router.push(
        "/play?songId=" +
          songId +
          "&&songName=" +
          songName +
          "&&singer=" +
          singer
      );
    },
    getPlayList() {
       this.playList = this.$store.state.songList;
             let a = this.$refs.to;
      this.isToggle = !this.isToggle;
      console.log(this.isToggle)
      if (this.isToggle) {
        a.className = "toggle active";
      } else {
        a.className = "toggle";
      }
     if(this.$refs.playlist){
       let nowSongIndex=0
     for(let i=0;i<this.playList.length;i++){
       if(this.playList[i].songId==this.songId){
         nowSongIndex=i
         break;
       }
     }
     this.ele=this.$refs.playlist[nowSongIndex]
     this.$refs.scroll.scrollToElement()
     this.ele=this.$refs.playlist[nowSongIndex]
     this.$refs.scroll.scrollToElement()
     }

    },
    playMusic() {
      if (this.songUrl != "") {
        this.$refs.audio.currentTime = this.$store.state.currentTime;
        this.isPlaying = !this.isPlaying;
        this.$refs.audio.play();
        this.$refs.img.className = "img active1";
      } else {
        this.isDisplay = !this.isDisplay;
      }
    },
    pauseMusic() {
      this.isPlaying = !this.isPlaying;
      this.$refs.audio.pause();
      this.$refs.img.className = "img";
    },
    musicEnd(){
      this.pauseMusic()
    }
  },
  beforeDestroy() {
    this.$store.commit("setCurrentTime", {
      currentTime: this.$refs.audio.currentTime
    });
  }
};
</script>
<style scoped>
.miniplayer {
  height: 60px;
  width: 100%;
  max-width: 1025px;
  background-color: white;
  position: fixed;
  bottom: 0;
  left:50%;
  transform: translate(-50%,0)
}
.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 15px;
  margin-right: 10px;
  animation: rotateImg 3s infinite linear;
  animation-play-state: paused;
}
.songInfo {
  position: relative;
  left: 0px;
  width: 224px;
}
.infosong{
  width:calc(100% - 100px)
}
.songTool {
  width: 100px;
  font-size: 40px;
}
.active1 {
  animation-play-state: running;
}
@keyframes rotateImg {
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.toggle {
  width: 95%;
  height: 300px;
  background-color: white;
  position: absolute;
  top: 0px;
  visibility: hidden;
  display: none;
  opacity:0;
  transition: all 0.5s ease-in;
 left: 50%;
 transform: translateX(-50%);
 box-shadow: 0px 0px 5px gray;

}
.active {
  opacity: 1;
  top: -300px;
  visibility: visible;
  z-index: 999;
  display: block;
}
.play-left {
  width: calc(100% - 50px);
}
.text-hidden {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.iconfont {
  font-size: 35px;
}
.loading {
  width: 30px;
  height: 30px;
  border: 2px solid gray;
  display: block;
  border-radius: 50%;
  border-right: none;
  border-top: none;
  animation: loading 2s infinite linear;
}
@keyframes loading {
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.songInfo {
  width: calc(100% - 60px);
}
.green{color:green;}
.icon-menu,.icon-song-pause,.icon-song-play{color:#1a73e8;}
</style>