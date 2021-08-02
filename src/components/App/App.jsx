import React, { useEffect, useState } from 'react'
import Body from '../Body/Body'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './App.scss'
import '../Body/body.scss'
import Loader from '../Loader/Loader'
export default function App() {
  const [user, setUser] = useState("")
  const [loading,setLoading] = useState(true)
  const getUser = async () => {
    try {
      let response = await fetch("http://localhost:5000/user", {credentials:"include"})
      response = await response.json()
      console.log(response?.user);
      setUser(response?.user)
      setLoading(false)
    }
    catch (e) {
      console.log(e);
      setLoading(false)
    }

  }
  useEffect(async () => {
  
   await getUser()
  }, [])

  
  return (
    <div className="app">
      {
        !loading &&
          (<Header {...user} getUser = {getUser}/>) 
      }
      {
          !loading ?
          (<Body {...user} />) : (
            <Loader/>
          )

      
      
      }
      <Footer/>
    </div>
  )
}

