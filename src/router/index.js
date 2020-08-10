import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'


Vue.use(VueRouter)


import Recommend from '@/views/Recommend'
import Singer from '@/views/Singer'
import Rank from '@/views/Rank'
import Search from '@/views/Search'
import SongSheetInfo from '@/components/main/songSheetInfo'
import play from '@/components/main/play'
import singerSongList from '@/components/main/singer/singerSongList'
import rankInfo from '@/components/main/rank'
import my from '@/components/main/my'
import sound from '@/components/main/test'
  const routes = [
    { 
      path:'/',
      component:Main,
      children:[ 
        {path:'recommend',component: Recommend},
        {path:'singer',component: Singer},
        {path:'rank',component: Rank},
        {
          path:'search',component: Search,
        },
        
      ],
      redirect:'/recommend'
    },
    {path:'/songSheetInfo',component:SongSheetInfo},
    {path:'/play',component:play},
    {path:'/singerSongList',component:singerSongList},
    {path:'/rankInfo',component:rankInfo},
    {path:'/my',component:my},
    {path:'/test',component:sound}
]

const router = new VueRouter({
  routes
})

export default router
