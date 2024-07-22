import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Private from './pages/Private'
import Home from './pages/Home'
import './App.css'
import ProtectiveRouter from './components/ProtectiveRouter'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './pages/firebase'


function App() {

  const [user , setUser] = useState(null)
  const [isFetching , setIsFetching] = useState(true)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth , (user)=>{
      if(user){
        setUser(user)
       setIsFetching(false)
        return 
      }

      setUser(null)
      setIsFetching(false)
    })
    return ()=> unsubscribe()
  },[])

  if(isFetching){
    return <h2>loading...</h2>
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route index path='/' element={<Home/>}></Route>
      <Route  path='/Private' element={<ProtectiveRouter user={user} ><Private/></ProtectiveRouter>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
