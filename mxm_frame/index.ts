interface MXM_CHILD_APP{
    name:string;
    url:string;
    title?:string;
    width?:number;
    height?:number;
    allow?:string[],
    referrerpolicy?:'no-referrer'|'no-referrer-when-downgrade'|'origin'|'origin-when-cross-origin'|'same-origin'|'strict-origin'|'strict-origin-when-cross-origin'|'unsafe-url'
    loading?:'eager'|'lazy'
}
const data = {
    frame:'',
    parent:'',
    children:[]
}

/** Frame微前端的基底函数 */
export const mxmFrameRoot = ()=>{
    let MxMFrame = data
    const registerChildren =(children:MXM_CHILD_APP[])=>{
        data.children.concat(children)
        MxMFrame = data
        return {
            msg: 'ok',
            data:MxMFrame.children
        }
    }
    const renderFrame=(frameName:string)=>{
        const getChildInfo = data.children.find(i=>{
           return  i.name === frameName
        })
        document&&document.createElement('frame',{
            
        })
    }

    return{
        MxMFrame,
        registerChildren
    }
}


/** Frame微前端的子程序函数 */
export const mxmFrameChild = ()=>{
    let MxMFrame = data
    const setParent = ()=>{}
    const  post=()=>{}
    const get=()=>{}
    const subscribe=()=>{}
    return{
        MxMFrame,
        setParent,
        post,
        get,
        subscribe
    } 
}