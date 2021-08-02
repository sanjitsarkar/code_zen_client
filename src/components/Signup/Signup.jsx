import React, { useState} from 'react'

function Signup({getUser}) {
      const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const handleSignup = async (e) => {
        e.preventDefault()
console.log(name,password,email);
        try {
            let response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
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
            <form onSubmit={(e) => { handleSignup(e)} }>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value)} }/>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value)} } />
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value)} }/>
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup
