module.exports={
    publicPath:"./",
    outputDir:"dist",
    
    devServer:{
        proxy:{
            
            '/':{
                target:'https://api.qq.jsososo.com',
                changeOrigin:true,
                ws:true,
                secure:false,
                // pathRewrite:{
                //     '^api':''
                // }
            },
            // '/song':{
            //     target:'https://localhost:3000',
            //     changeOrigin:true,
            //     ws:true,
            //     secure:false,
            //     // pathRewrite:{
            //     //     '^api':''
            //     // }
            // },
        }
    }
}
// module.exports = {
//     devServer: {
//         // open: true,
//         // host: 'localhost',
//         // port: 8080,
//         // https: false,
//         //以上的ip和端口是我们本机的;下面为需要跨域的https://api.qq.jsososo.com
//         proxy: {//配置跨域
//             '/api2': {
//                 target: 'http://localhost:3000',//这里后台的地址模拟的;应该填写你们真实的后台接口
//                 ws: true,
//                 changOrigin: true,//允许跨域
//                 pathRewrite: {
//                     '^/api2': ''//请求的时候使用这个api就可以
//                 }
//             }

//         }
//     }
// }
// module.exports={
//     //服务器会将请求路径为/api2的替换为http://localhost:3000
//     devServer : {
//         proxy:{
//             '/api2':{
//                 target:'http://localhost:3000',
//                 changeOrigin:true
//             }
//         }
//     },
// 	//publicPath:'/myApp/'
// }