import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import './header.scss'
function Header({ name, email, id ,getUser}) {
    // const { name, email, id } = user
    const logout = async (e) => {
              try {
            let response = await fetch("http://localhost:5000/logout", {
                credentials: "include",
                
            })
                  response = await response.json()
                   await getUser(e)
            console.log(response);
                
    }
        catch (e) {
            console.log(e);
            
    }
    }
    return (
        <div className="header">
            <h1>
               <Link to="/" className="site_title"> CodeZen</Link>
                </h1>
            <h2>{name}</h2>
            {name && <button onClick={(e) => { logout(e) }}>Logout</button>}
            {!name && <Login getUser={getUser} />}
            {!name &&<Signup getUser={getUser} />}
        </div>
    )
}

export default Header
