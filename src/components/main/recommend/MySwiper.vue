<template>
<div class='my-swiper'>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="(item,i) of swiperList" :key="i">
      <img :src="item.img" alt="lunbo" class="w100" @load="imgLoad" ref="imgSize">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
name:'',
data() {
    return {
      imgHeight:0
    }
},
props: {
    swiperList:{
        type:Array,
        required:true
    },
     swiperOptions: {
        type:Object,
        required:true
    }
},
components: {
    Swiper,
    SwiperSlide 
  },
methods:{
  imgLoad(){
    
    
    this.imgHeight=this.$refs.imgSize[0].height
    this.$emit('img-size',this.imgHeight)
    
    this.$emit('img-load')
  }
},
mounted(){
  
}
  
}

</script>
<style scoped>

</style>