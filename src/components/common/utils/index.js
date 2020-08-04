import Vue from 'vue'
import messageBox from './messageBox.vue'

let MessageBox=(opt)=>{
    let myComp=Vue.extend(messageBox)

    let vm=new myComp({
        el:document.createElement('div'),
        data:{ 
            title:opt.title || '默认标题',
            content:opt.content ||'默认内容'
        },
        methods:{
            messageTest(){
                if(opt.messageTest){
                    opt.messageTest()
                    document.body.removeChild(vm.$el)
                }
            }
        }
    })
    document.body.appendChild(vm.$el)
}

export default{
    install(Vue){
        Vue.prototype.message=MessageBox
    }
}