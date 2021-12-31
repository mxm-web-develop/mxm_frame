import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1 id='title'>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

const title = document.querySelector('#title')

title?.addEventListener('click', () =>{
  console.log('123');
  
})

window.addEventListener("message", receiveMessageFromIndex, false)
function receiveMessageFromIndex ( event:MessageEvent ) {
  if(event.data.method === 'MessageFromRoot'){
    return event.data
  }
}

