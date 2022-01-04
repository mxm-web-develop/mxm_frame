import { createApp } from 'vue'
import App from './App.vue'
import {mxmFrameRoot} from './mxm_frame/index'

const {registerChildren,MxMFrame} = mxmFrameRoot()
const app= createApp(App)
const register =registerChildren([
    {
        name:'ts-project',
        url:'http://192.168.21.133:3002'
    },
    {
        name:'react-project',
        url:'http://192.168.21.133:3003'
    },
    // {
    //     name:'vue-project',
    //     url:'http://192.168.21.133:3005'
    // }
])


app.mount('#app')