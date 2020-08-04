<template>
  <div class="singer">
    <loading v-if="isLoading" />
    <singer-category :singer-category="singerCategory" @category-click="fetchSingerList" />
    <div class="singerlist pos-r t-0">
      <Scroll :list="singerList" :top="0" ref="scroll">
        <div class="scroll-wrapper">
          <singer-list :list="singerList" />
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import SingerCategory from "@/components/main/singer/SingerCategory";
import SingerList from "@/components/main/singer/SingerList";
import Scroll from "@/components/common/Scroll";
import loading from '@/components/common/loading'
export default {
  name: "",
  components: {
    SingerCategory,
    SingerList,
    Scroll,
    loading
  },
  data() {
    return {
      singerCategory: {},
      singerList: [],
      isLoading:true
    };
  },
  methods: {
    // 获取歌手分类
    async fetchSingerCate() {
      if(window.localStorage.getItem('singerCate')){
        this.singerCategory=JSON.parse(window.localStorage.getItem('singerCate'))
      }else{
            const {
                  data: { data: category }
                } = await this.$http.get("/singer/category");
                this.singerCategory = {
                  sex: category.sex,
                  genre: category.genre,
                  area: category.area
                };
                window.localStorage.setItem('singerCate',JSON.stringify(this.singerCategory))
      }
    },
    //获取歌手列表
    async fetchSingerList(params) {
      this.singerList = [];
      const res = await this.$http.get("/singer/list", { params });
      this.singerList = res.data.data.list;
      this.$refs.scroll.refresh();
      this.isLoading=false
    }
  },
  created() {
    this.fetchSingerCate();
    this.fetchSingerList();
  }
};
</script>
<style scoped>
.singerlist{height:calc(100vh - 283px)}
</style>