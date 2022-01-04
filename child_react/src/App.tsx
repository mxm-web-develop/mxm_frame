import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { mxmFrameChild } from './mxm_frame'
interface IData {
  app:string,
  author:string,
  date:string
}
function App() {
  const [count, setCount] = useState<{data:IData,id:string,method:string} | undefined>()
  const {getStore}= mxmFrameChild()

  const getParentStore = async()=>{
     const res = await getStore() as any
     console.log(res,'res');
     
     setCount(res)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <button className="btn" onClick={getParentStore}>GetStoreData</button>
        <div>{count&&count.data.app}</div>
      </header>
    </div>
  )
}

export default App
