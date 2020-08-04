
const util={
     debounce(func,wait,immediately){
        let timer
        let callNow=immediately || false
        return function(){
            clearTimeout(timer)
            let self=this
            let args=arguments
            if(callNow){  //立即执行
                let a= !timer
                timer= setTimeout(()=>{
                    timer=null
                },wait)
                if(a){
                    func.apply(self,args)
                }
            }else{
                timer=setTimeout(function(){
                    func.apply(self,args)
                    // func()
                },wait)
            }
        }
    },
    easy(func,timer){
        // let timer
        
        return function(){
            clearTimeout(timer)
           timer= setTimeout(function(){
               func()
           },1000)
        }
    }
}
export default util