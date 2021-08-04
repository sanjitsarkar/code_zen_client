import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Modal.scss"
const Modal = ({codes}) => {
    const [fileName, setFileName] = useState("")
    console.log("codes",codes)
    const handleSubmit = async(e) => {
        e.preventDefault()
        let response = await fetch("http://localhost:5000/save", {
                method: "POST",
                body: JSON.stringify({ title:fileName, code:"", format:"py", lang:"python"}),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                
            })
            response = await response.json()
            window.location.assign("/code/"+response?.data?._id)
            console.log(response?.data?._id)
    }
    return (
        <div id="modal">
            <div className="saved_codes">
                

                <ul>
                    <h2>Saved Codes</h2>
                    {codes.length?(
                        
                        codes.map((code)=>
                            <li key={code._id}>
                                <Link to={"/code/"+code._id}>{code.title}.{code.format}</Link></li>
                        )
                    ):(<p>There is no any saved codes :(</p>)}
                    
                </ul>

            </div>
            <form on onSubmit={handleSubmit}>
                <input type="text" placeholder="File name" value={fileName} onChange = {(e)=>{setFileName(e.target.value)}}/>
                <button>Create</button>
            </form>
        </div>
    )
}

export default Modal
