<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { onMounted } from '@vue/runtime-core';

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const fullScreen =()=>{
  const iF = document.getElementById('child_react');
  if(iF){
    iF.requestFullscreen()
  }
}
const closeFrame = ()=>{
 const iF = document.getElementById('mxm_frame');
 if(iF){
   iF.remove()
 }
}
localStorage.setItem('user',JSON.stringify({name:'zhang',key:'sdfhjsdlkfjl'}))



onMounted(()=>{
  const mxmFrame = document.querySelector('#mxm_frame')
  mxmFrame?.childNodes.forEach(i=>{
    if(i.nodeName === 'IFRAME'){
      const frame = i as HTMLIFrameElement
      frame.onload =()=>{
        console.log('加载frame中');
        frame.contentWindow?.postMessage({method:'MessageFromRoot',data:[1,2,3,4,5]},'*')
      }
    }
    return
  })

})

</script>

<template>
  <div>
    <div class='header'>
      这个是主程序
    </div>
    <div class='box'>
      <div class='nav'>
        <div class='nav-item'>REACT 子程序</div>
        <div class='nav-item'>Ts 子程序</div>
      </div>
      <div class='iframe-containe'>
        <div id="mxm_frame">
            <div class='iframe-tools'>
              <div @click="fullScreen">全屏</div>
              <div @click="closeFrame">关闭</div>
            </div>
          <iframe class='frame' loading='lazy' id='child_react' src='https://192.168.21.133:3000/' name='child_react' allow='fullscreen'>

  
          </iframe>  
        </div>
      </div>
    </div>
  </div>
</template>

<style>
*{
  margin: 0;
}
.header{
  widows: 100%;
  height:36px;
  text-align: center;
  font-size:20px
}
.box{
  display:flex;
}
.iframe-tools{
  display:flex;
  position: absolute;
  right: 0;
  padding:3px;
  background-color:white;
  z-index: 99;
}
.iframe-container{
  display:flex;
  position: relative;
  height: 100%;
}
.nav{
  display:flex;
  flex-direction:column;
  width: 200px;
  color:white;
  background-color: cadetblue;
}
.iframe-tools{

}
.nav-item{
  padding:15px;
  cursor:pointer;
}
.iframe-containe{
  width: calc(100vw - 200px);
  height: calc(100vh - 42px);
}
.frame{
    width: 100%;
  height: 100%;
  border:none;
}
</style>
