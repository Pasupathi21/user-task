import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// redux context
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

console.log("store >>>>>>>", store)
createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <StrictMode>
      <App />
    </StrictMode>,
  </Provider>
)
