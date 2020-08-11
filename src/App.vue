<template>
  <div class="app bg-gray1">
   <transition :name="ttName">
    
    <router-view/>
   
   </transition>
  </div>
</template>
<script>
export default {
  
  name:'App',
  data(){
    return {
      ttName:''
    }
  },
  watch:{
    $route(to,from){
      if(from.path=='/recommend' ||from.path=='/singer' ||from.path=='/rank'  ||from.path=='/search'){
        if(to.path=='/play'){
          this.ttName='indexToPlay'
        }
      }else if(from.path=='/play' && to.path=='/songSheetInfo'){
          this.ttName='Back'
      }else if(from.path=='/play' && to.path=='/singerSongList'){
        this.ttName='Back'
      }else if(from.path=='/play' && to.path=='/rankInfo'){
        this.ttName='Back'
      }else{
          this.ttName=''
        }
    }
  }
}
</script>
<style scoped>
.app{
  width: 100%;
  height: 100%;
  max-width: 1025px;
  margin:0 auto;
  position:relative;
  top:0;
}
.indexToPlay-enter,.indexToPlay-leave-to{
  position: relative;
  top:100%;
}
.indexToPlay-enter-to,.indexToPlay-leave{
  position: relative;
  top:0;
}
.indexToPlay-enter-active,.indexToPlay-leave-active{
  transition: top .5s ease
}
.Back-enter,.Back-leave-to{
  position: relative;
  left:100%;
}
.Back-enter-to,.Back-leave{
  position: relative;
  left:0;
}
.Back-enter-active,.Back-leave-active{
  transition: left .5s ease
}
</style>
