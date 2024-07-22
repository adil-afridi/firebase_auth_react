import React from 'react'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'

const handleSignOut = ()=>{
  signOut(auth)
  .then(()=>alert('Signed Out Successfully!'))
  .catch(error=>{
    console.log(error)
    alert(error.message)
  })
}

function Private() {
  return (
    <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
      <h1>Private page</h1>
      <button onClick={handleSignOut} >SignOut</button>
    </div>
  )
}

export default Private
