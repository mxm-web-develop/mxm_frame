import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { mxmFrameChild } from './mxm_frame'


const {setParent}= mxmFrameChild()
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

setParent('http://192.168.21.133:3001')