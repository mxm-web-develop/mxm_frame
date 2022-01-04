<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { onMounted } from '@vue/runtime-core';
import { ref } from 'vue';
import { mxmFrameRoot } from './mxm_frame'
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const fullScreen =()=>{
  const iF = document.getElementById('child_react');
  if(iF){
    iF.requestFullscreen()
  }
}
const mxmFrame = ref<HTMLElement>()
// const {MxMFrame}= mxmFrameRoot()
const close = ()=>closeFrame(mxmFrame.value!)
localStorage.setItem('mxmFrameRoot',JSON.stringify({app:'IFrame_Micro',author:'mxm.web',date:'2021/11/15'}))

const { MxMFrame,renderFrame ,closeFrame} = mxmFrameRoot()
const renderChild=(name:string)=>{
  mxmFrame.value?
    renderFrame(name,mxmFrame.value):''
}

</script>

<template>
  <div>
    <div class='header'>
      mxm_frame_Micro
    </div>
    <div class='box'>
      <div class='nav'>
        <div class='nav-item' @click="renderChild('react-project')">REACT 子程序</div>
        <div class='nav-item' @click="renderChild('ts-project')">Ts 子程序</div>
         <div class='nav-item' @click="renderChild('vue-project')">Vue 子程序</div>
      </div>
      <div class='iframe-containe'>
        <div id="mxm_frame" ref='mxmFrame'>
            <div class='iframe-tools'>
              <div @click="fullScreen">全屏</div>
              <div @click="close">关闭</div>
            </div>

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
  line-height: 32px;
  text-align: left;
   padding-left: 20px;
  font-size:20px;
 box-shadow: 3px 3px 1px #e6e6e6;
}
.box{
  display:flex;
}
.iframe-tools{
  display:flex;
  position: absolute;
  right: 20px;
  top:55px;
  padding:5px 15px;
  background-color:white;
  z-index: 99;
}
.iframe-container{
  display:flex;
  position: relative;
  height: 100%;
  overflow: hidden;
}
.nav{
  display:flex;
  flex-direction:column;
  width: 200px;
  color:white;
  background-color: cadetblue;
}
#mxm_frame{
  height: 100%;
  overflow: hidden;
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
  overflow: hidden;
}
</style>
