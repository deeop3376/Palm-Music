<template>
  <div class="recommend">
    <loading v-if="isLoading" />
    <my-swiper :swiper-list="swiperList" :swiper-options="swiperOption" @img-load="scrollRefresh" @img-size="imgSize" />
    <div class="songSheetList pos-r t-0" ref="songList">
      <Scroll :top="0" :list="hotSong" ref="scroll">
        <div class="scroll-wrapper">
          <song-sheet-list :hot-song="hotSong" />
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import MySwiper from "@/components/main/recommend/MySwiper";
import SongSheetList from "@/components/main/recommend/SongSheetList";
import Scroll from "@/components/common/Scroll";
import loading from "@/components/common/loading";
export default {
  name: "",
  components: {
    MySwiper,
    SongSheetList,
    Scroll,
    loading
  },
  data() {
    return {
      swiperList: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true,
        autoplay: true
      },
      hotSong: [],
      isLoading: true
    };
  },
  methods: {
    async fetchSwiperList() {
      const res = await this.$http.get("/recommend/banner");
      this.swiperList = res.data.data.map(item => ({
        img: item.picUrl,
        id: item.id
      }));
    },
    async fetchHotSong() {
      const res = await this.$http.get("/recommend/playlist/u");
      this.hotSong = res.data.data.list.map(item => ({
        id: item.content_id,
        img: item.cover,
        title: item.username,
        info: item.title
      }));
    },
    scrollRefresh() {
      this.$refs.scroll.refresh();
      this.isLoading = false;
    },
    imgSize(imgHeight){

      let songList=document.querySelector('.songSheetList')
     let clientHeight= document.documentElement.clientHeight || document.body.clientHeight
    songList.style.height=clientHeight- 130-imgHeight+'px'
    }
  },
  created() {
    this.fetchSwiperList();
    this.fetchHotSong();
  },
  mounted(){
    
  }
};
</script>
<style scoped>
.songSheetList{height: calc(100vh - 305px);}
</style>