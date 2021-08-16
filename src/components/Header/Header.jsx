import React,{useContext,useState} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../App/App'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import './header.scss'

function Header() {
    
   const authCtx = useContext(AuthContext)
   const {_auth,dispatchAuth}  = authCtx
   const [isModalOpenLogin, setIsModalOpenLogin] = useState(false)
   const [isModalOpenSignup, setIsModalOpenSignup] = useState(false)
    const logout = async (e) => {
        
              try {
    dispatchAuth({type:"LOADING"})

            let response = await fetch("https://codezzen.herokuapp.com/logout", {
                credentials: "include",
                
            })
                  response = await response.json()
            console.log(response);
    dispatchAuth({type:"SUCCESS",payload:response})

                
    }
        catch (e) {
            console.log(e);
    dispatchAuth({type:"FAILURE",payload:e.message})
            
    }
    }
    return (
        <div className="header">
             <Login isModalOpen={isModalOpenLogin} closeModal={()=>setIsModalOpenLogin(false)}/>
             <Signup isModalOpen={isModalOpenSignup} closeModal={()=>setIsModalOpenSignup(false)}/>
            <div className="left">
            <h1>
               <Link to="/" className="site_title"> CodeZen</Link>
                </h1>
                </div>
                <div className="right">
            {_auth?.data?.user?.name && <h2 id="user_name">{_auth?.data?.user?.name}</h2>}
            {_auth?.data?.user?.name && <button onClick={(e) => { logout(e) }}>Logout</button>}
            {!_auth?.data?.user?.name && <button onClick={(e) => { setIsModalOpenLogin(!isModalOpenLogin) }}>Login</button>}
            {!_auth?.data?.user?.name &&<button onClick={(e) => { setIsModalOpenSignup(!isModalOpenSignup) }}>Signup</button>}
            </div>
        </div>
    )
}

export default Header
