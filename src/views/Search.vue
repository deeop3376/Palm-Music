<template>
<div class='search'>
    <div class="common search-text">
         <input
            placeholder="请输入歌曲或歌手名"
            type="text"
            v-model="searchText"
            class="inputText"
            />
        
        <p v-if="resultLoad" @click="resultLoad=false">关闭</p>
        <div v-if="resultLoad" style="height:550px;position:relative;top:0;">
        <scroll v-if="resultLoad" :list="searchResult" :top="0" ref="scroll">
            <div>
                <ul>
                        <li 
                        class="d-flex flex-wrap ai-center border-b border-t py-2 pl-3"
                        v-for="(item,i) in searchResult" :key="item.songmid"
                        @click="goPlay(item.songmid)"
                        >
                            <span class="mr-4">{{i+1}}</span>
                            <div class="d-flex flex-wrap ai-center">
                                <span class="w100">{{item.songName}}</span>
                                <span class="text-gray2 text-xs">
                                    {{item.singer}}                            
                                </span>
                            </div>
                        </li>

                    </ul> 
            </div>
        </scroll>
        </div>
    </div>
    <div class="common hot-search">
        <p class="text-gray2 text-md" >热门搜索</p>
        <div class="common">
            <ul class="d-flex flex-wrap">
                <li v-for="(item,i) in hotSearch" :key="i" 
                class="hot-search-text text-gray2"
                @click="search(item)"
                >
                {{item}}
                </li>

            </ul>
        </div>
    </div>
    <div class="common search-history">
        <div class="d-flex jc-between ai-center">
            <p class="text-gray2 text-md">搜索历史</p>
            <i class="iconfont icon-delete" @click="deleteHistory"></i>
        </div>
        <div class="common">
            <ul>
                <li v-for="(item,i) in searchHistoryList" :key="i"
                 class=" text-gray2 mb-2 d-flex jc-between"
                 @click="search(item)">
                    <span>{{item}}</span>
                     
                </li>
               
            </ul>
        </div>
    </div>
 <!-- <audio
        @canplay="audioLoaded"
        controls
        autoplay
        :src="testSrc"
       hidden="true"
        ref="audio"
        @durationchange="dc"
      ></audio> -->

</div>
</template>

<script>
import Scroll from '@/components/common/Scroll'
// import messageBox from '@/components/common/utils/index.js'
// import util from '@/util/debounce'
export default {
name:'',
components: {
    Scroll,
},
data() {
return {
    searchText:'',
    hotSearch:[],
    searchResult:[],
    resultLoad:false,
    timer:null,
    searchHistoryList:[],
    testBox:false,
    showMessage:'请选择要播放的歌曲',
    // testSrc:''
}
},
watch: {
    searchText(){
        // this.search(newVal)
        
        clearTimeout(this.timer)
        this.timer= setTimeout(this.search,1000)
    }
},
created() {
    // this.testSrc=this.$store.state.testSrc
    this.getHotSearch()
    this.searchHistoryList=JSON.parse(window.localStorage.getItem('searchHistoryList'))
},
methods: {
    // audioLoaded(){
    //     let audio = this.$refs.audio
    //     alert(audio.duration)
    // },
    // durationchange(){
    //     alert('dc'+this.$refs.audio.duration)
    // },
    deleteHistory(){
        this.searchHistoryList=[]
    },
    async getHotSearch(){
        const res=await this.$http.get('/search/hot')
        if(res.data.data.length>8){
            for(let i=0;i<8;i++){
                this.hotSearch.push(res.data.data[i].k)
            }
        }
    },
    async search(item1){
        var item=item1 || this.searchText
        console.log(item)
        //将要搜索的关键词放入localStorage中的搜索历史中
        if(window.localStorage.getItem('searchHistoryList')){ 
            let searchHistoryList=JSON.parse(window.localStorage.getItem('searchHistoryList'))
            if(!searchHistoryList.includes(item)) {
                searchHistoryList.push(item)
                this.searchHistoryList=searchHistoryList
                window.localStorage.setItem('searchHistoryList',JSON.stringify(searchHistoryList))
            }
        }else{
            let searchHistoryList=[]
            searchHistoryList.push(item)
            this.searchHistoryList=searchHistoryList
            window.localStorage.setItem('searchHistoryList',JSON.stringify(searchHistoryList))
        }
       
        const res = await this.$http.get('/search?key='+item)
       console.log(res)
        this.searchResult= res.data.data.list.map(item=>{
            return {
                songName:item.songname,
                songmid:item.songmid,
                singer:item.singer[0].name
            }
        })
        
        this.resultLoad=true
    },
    goPlay(songId){
        
         this.$store.commit('setSongId',{songId})
        this.$router.push('/play?songId='+songId)
    }
},
}
</script>
<style scoped>
/* .search{width:100%;} */
.common{width:90%;margin:0 auto}
.hot-search-text{width:33%;margin-bottom:15px;}
.el-icon-delete{font-size: 20px;}
.inputText{width:100%;height: 40px;border:1px solid gray}
</style>