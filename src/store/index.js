import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songId: '',
    songUrl: '',
    songName: '',
    singer: '',
    songContent: [],
    isPlaying:false,
    currentTime:0,
    duration:0,
    songList:[]
  },
  mutations: {
    setSongId(state, payload) {
      state.songId = payload.songId
    },
    setSongUrl(state, payload) {
      state.songUrl = payload.songUrl
    },
    setSongInfo(state, payload) {
      state.songName = payload.songName
      state.singer = payload.singer
    },
    setSongContent(state, payload) {
      state.songContent = payload.lyricArr
    },
    setCurrentTime(state,payload){
      state.currentTime=payload.currentTime
      
    },
    setSongList(state,payload){
      state.songList=payload.songList
    }
  },
  actions: { 

    fetchSongInfo({ state, commit }) {
      return new Promise((resolve) => {
        api.fetchSongInfo(state.songId).then((res) => {
          
          if(res.data.data.lyric.indexOf('纯音乐，请您欣赏')!=-1){
            api.fetchSongUrl(state.songId).then((res) => {
              let songUrl = res.data.data
              commit('setSongUrl', { songUrl })
              if(state.songUrl!=''){
                resolve()
              }
            })
          }else{
            let arr = res.data.data.lyric.split('\n')
          arr.splice(2, 3)
          var arr1 = arr.map(item => {
            if (item.includes('[ti:')) {
              return item.replace('[ti:', '').replace(']', '')
            }
            if (item.includes('[ar:')) {
              return item.replace('[ar:', '').replace(']', '')
            }
            if (item.includes('[')) {
              return item.replace('[', '').replace(']', '')
            }

            return item
          })

          var lyricInfo = {}
          let lyricArr = []
          for (var i = 2; i < arr1.length; i++) {
            if (arr1[i].substring(8) != '') {
              lyricInfo.minute = parseInt(arr1[i].substring(0, 2))
              lyricInfo.second = parseInt(arr1[i].substring(3, 5))
              lyricInfo.content = arr1[i].substring(8)
              lyricArr.push(lyricInfo)
              lyricInfo = {}
            }
          }
          let songName = arr1[0]
          let singer = arr1[1]
          commit('setSongInfo', { songName, singer })
          commit('setSongContent', { lyricArr })
          api.fetchSongUrl(state.songId).then((res) => {
            let songUrl = res.data.data
            commit('setSongUrl', { songUrl })
            if(state.songUrl!='' ){
              resolve()
            }
          })
          }
          
          // api.fetchSongUrl(state.songId).then((res) => {
          //   let songUrl = res.data.data
          //   commit('setSongUrl', { songUrl })
          //   if(state.songUrl!='' ){
          //     resolve()
          //   }
          // })
          
        })
        

      })
    }
  },
  modules: {
  }
})
