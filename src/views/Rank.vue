<template>
<div class='rank'>
    <loading v-if="isLoading" />
    <scroll :list="rankList" :top="83">
        <div class="scroll-wrapper" style="overflow:hidden">
            <div v-for="rank of rankList" :key="rank.topId" class="d-flex mx-4 my-3 shadow"
            @click="goRankInfo(rank.topId,rank.picUrl)"
            >
                <div class="img">
                    <img v-lazy="rank.picUrl" alt="排行榜" style="width:100%;"/>
                </div>
                <ul class="d-flex flex-wrap ai-center pl-3 text-gray2 text-xs content">
                    <li v-for="(song,index) of rank.song" :key="index " class="w100">
                        {{++index}}. {{song.title}}
                    </li>
                </ul>
            </div>
        </div>
    </scroll>
</div>
</template>

<script>
import Scroll from '@/components/common/Scroll'
import loading from '@/components/common/loading'
// import api from '@/api'
export default {
name:'rank',
components: {
    Scroll,
    loading
},
data() {
return { 
    rankList:[],
    isLoading:true
}
},
created() {
    this.fetchRankList()
},
watch: {},
methods: {
     goRankInfo(id,picUrl){
        this.$router.push('/rankInfo?id='+id+'&&picUrl='+picUrl)
    },
    async fetchRankList(){
        
        const res= await this.$http.get('/top/category',{params:{showDetail:1}})
        
        this.rankList = res.data.data.reduce((total,item)=>total.concat(item.list),[])
        this.isLoading=false
        
    },
    imgLoad(){
        this.$nextTick(()=>{
            console.log('aaaaa')
            this.$refs.img.className="img"
        })
    }
},
}
</script>
<style scoped>
.content{width: calc(100vw - 142px)}
.img{width:100px;height: 100px;border: 0px solid black;}
</style>