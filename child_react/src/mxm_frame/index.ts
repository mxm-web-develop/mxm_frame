import { ref, Ref, watch, toRaw, reactive, isRef, unref,triggerRef,TriggerOpTypes } from "vue";
import {debounce} from 'ts-debounce';
interface MXM_CHILD_APP{
    name:string;
    url:string;
    title?:string;
    width?:any;
    height?:any;
    allow?:string[],
    referrerpolicy?:'no-referrer'|'no-referrer-when-downgrade'|'origin'|'origin-when-cross-origin'|'same-origin'|'strict-origin'|'strict-origin-when-cross-origin'|'unsafe-url'
    loading?:'eager'|'lazy'
}
interface GOLBAL_DATA{
    frame:string;
    parent:string;
    children:MXM_CHILD_APP[];

}
const responseMsg = ref()
const data:GOLBAL_DATA = {
    frame:'',
    parent:'',
    children:[],
}
enum Methods {
    GET_PARENT_STORE = 'get_parent_store',
    SEND_STORE_TO_CHILD = 'send_store_to_child'
}
/** Frame微前端的基底函数 */
export const mxmFrameRoot = ()=>{
    let MxMFrame = data
    const registerChildren =(children:MXM_CHILD_APP[])=>{
        if(data.children.length){
            data.children.concat(children)
        }else{
            data.children = children
        }
        MxMFrame = data
        return {
            msg: 'ok',
            data:MxMFrame.children
        }
    }

    const renderFrame=(frameName:string,el:HTMLElement)=>{
        const getChildInfo = data.children.find(i=> i.name === frameName)
        closeFrame(el)
        const frame = document&&document.createElement('iframe')
        if(getChildInfo){
            openToolbar(el)
            frame.id= getChildInfo.name
            frame.src = getChildInfo.url
            frame.style.width = getChildInfo.width?getChildInfo.width:'100%'
            frame.style.height= getChildInfo.height?getChildInfo.height:'100%'
        }
        el.appendChild(frame)
        frame.onload =(i)=>{
            return frame
        }
    }
    const openToolbar = (el:HTMLElement)=>{
        const toolbar = el.children.item(0) as HTMLElement;
        toolbar.style.display = 'flex';
    }
    const closeFrame = (el:HTMLElement)=>{
        if(el.children.length>0){
           const frame = el.children.item(1)
           const toolbar = el.children.item(0) as HTMLElement;
           toolbar.style.display = 'none';
           frame&&frame.remove();
        }else{
          return
        }
    }
    return{
        MxMFrame,
        closeFrame,
        registerChildren,
        renderFrame
    }
}


/** Frame微前端的子程序函数 */
export const mxmFrameChild = ()=>{
    let MxMFrame = data
    const setParent = (url:string)=> {
        data.parent = url 
        window.addEventListener('message',receiveMessageFromIndex,false);
    }
    const post=()=>{}
    const getStore= debounce(async ()=>{
        if(!data.parent) throw new Error('没有找到主程序')
        const parentDomain = data.parent
        const id =( Math.random()*1e8).toString()
        parent.postMessage({
                id:id,
                method: 'get_parent_store'
        },'*')
        return new Promise((resolve, reject)=>{
           watch(responseMsg,()=>{
                let output;
                if(isRef(responseMsg)){
                    output= JSON.parse(JSON.stringify(responseMsg))._value
                    
                } else {
                    output = responseMsg
                    
                }
                resolve(output)
            })
        })
    },300)

    const receiveMessageFromIndex= (event:MessageEvent)=>{
        if(event.origin === data.parent){
            if(event.data){
                const response =event.data
                switch(event.data.method){
                    case 'child_loaded':
                    break;
                    case Methods.SEND_STORE_TO_CHILD:
                        responseMsg.value = response
                    break;
                        
                }
            }
        }  
    }
    const get=()=>{}
    const subscribe=()=>{}
    return{
        MxMFrame,
        setParent,
        post,
        get,
        subscribe,
        getStore
    } 
}


