import axios from 'axios'
// const axios=axios1.create({
//     baseURL:'/api/'
// }) 
const api= {
    fetchSongUrl(songId){
       return axios.get('/song/url?id='+songId)
    },
    fetchSongInfo(songId){
        return axios.get('/lyric?songmid='+songId)
    },
    getSingerSongList(mid){
        return axios.get('/singer/songs?singermid='+mid)
    },
    getRankInfo(topid){
        return axios.get('/top?id='+topid)
    }
}
export default api