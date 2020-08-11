<template>
  <div class="test">
    <button @click="testSound">aaaa</button>
  </div>
</template>

<script>
export default {
  name: "sound",
  components: {},
  data() {
    return {
      AudioContext: null,
      audioCtx: ""
    };
  },
  created() {
    
    let auct = window.AudioContext || window.webkitAudioContext;
    let audioCtx = auct ? new AudioContext() : "";

    this.AudioContext = auct;
    this.audioCtx = audioCtx;
    this.testSound();
  },
  watch: {},
  methods: {


    getBuffer(link) {
      let self=this
      return new Promise((resolve, reject) => {
        
        if (self.audioCtx) {
          
          let request = new XMLHttpRequest();
          request.open("GET", link, true);
          request.responseType = "arraybuffer";
          request.onload = function() {
            self.audioCtx.decodeAudioData(
              request.response,
              function(buffer) {
                resolve(buffer);
              },
              function(e) {
                console.log("reject");
                reject(e);
              }
            );
          };
          request.send();
        } else {
          reject("not support AudioContext");
        }
      });
    },


    createSound(buffer) {
      if (this.audioCtx.state == "suspended") {
        console.log("重启this.audioCtx");
        this.audioCtx.resume();
      }
      let source = this.audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioCtx.destination);
      return source;
    },


    testSound() {
      let item = {
        sound:
          "http://117.128.6.13/cache/122.226.161.16/amobile.music.tc.qq.com/M500004LZrCi21H0gp.mp3?guid=4684796&vkey=F7135983F4D1F61721E3ECDFCDEE6DEC0AF4EE316FDB69EDFCD995F8892EE79CF33C83A72EBF2FB395DC743569C47B663B4C52A829D745E6&uin=1899&fromtag=66&ich_args2=546-09162504024545_b18283d9c6beefec9fb62b2a60653231_10004311_9c896d2adec5f0d49333518939a83798_88db24c9e21f2fd73bd23aea4df796f3",
        
      };
      // let name='abc'
      let soundBuf
      this.getBuffer(item.sound) // item.sound是音频线上地址
        .then(buf => {
          console.log('aaaaaaa')
          
          soundBuf = buf; // 存储，方便调用

           let sound;
      // alert(soundBuf.duration)
      if (soundBuf) {
        sound = this.createSound(soundBuf);
        sound.start(0); // 播放
      } else {
        console.log("download sound failed？");
      }
        })
        .catch(e => {
          console.log('catch')
          console.log(e);
        });

      // ...
      // 使用
     
    }
  }
};
</script>
<style scoped>
.test {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>