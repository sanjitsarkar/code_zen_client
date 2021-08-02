import React, { useState } from 'react'

function Login({getUser}) {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch("http://localhost:5000/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                credentials: "include",
                headers: {"Content-Type":"application/json"},
                
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
        <div>
            <form onSubmit={(e) => { handleLogin(e)}}>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value)} } />
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value)} }/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
