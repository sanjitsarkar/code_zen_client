import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '../CodeEditor/CodeEditor'
import InputSection from '../InputSection/InputSection'
import Modal from '../Modal/Modal'
import OutputSection from '../OutpSection/OutputSection'
import  './body.scss'
function Body({ name, email, id, }) {
    // const [code, setCode] = useState("")
    // const [title, setTitle] = useState("")
    // const [format, setFormat] = useState("")
    // const [lang, setLang] = useState("")
    
    // console.log(codeId)
    const [inputData, setInputData] = useState("")
    const [outputData, setOutputData] = useState("")
    const [_id, set_Id] = useState(useParams().id)
    const [codes, setCodes] = useState([])

    const codeId = useParams().id
    const saveCode = async (e, title, code, format, lang) => {
        // console.log("body",title, code, format, lang)
        console.log("_id",_id)
        e.preventDefault()
        try {
            let response = await fetch("http://localhost:5000/save", {
                method: "POST",
                body: JSON.stringify({ title, code, format, lang,_id }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                
            })
            response = await response.json()
            console.log("id",response);
            if(!codeId)
            set_Id(await response?.data?._id)
                
        }
        catch (e) {
            console.log(e);
            if(e.toString().includes("TypeError"))
            {
                alert("The filename with this title already exists, Please change the name of the file and try again...")
            }
            
        }
    }
    const setInput = (e, data) => {
        e.preventDefault()
        setInputData(data)
    }


    const runCode = async(e, title, code, format, language) => {
        e.preventDefault()
        await saveCode(e, title, code, format, language)
        if (_id)
        {
            try {
                let Idata = ""
                if (inputData.includes("\n"))
                    
                     Idata = inputData.split("\n")
                else if(inputData.includes(" "))
                    Idata = inputData.split(" ")
                else
                    Idata = inputData
                    
            let response = await fetch("http://localhost:5000/compile", {
                method: "POST",
                body: JSON.stringify({ id:_id,input:Idata}),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                
            })
                response = await response.json()
                console.log(response);
            setOutputData(response)
                
        }
        catch (e) {
            console.log(e);
            
        }
        }
        else {
            alert("Save Code Before Compiling")
        }
    }
    
const fetchCodes = async() =>{
  const response = await fetch("http://localhost:5000/codes",{credentials:"include"})
  const codes = await response.json()
  setCodes(codes)
//   console.log(codes)
}
    useEffect(() => {
       fetchCodes()
    }, [])
    return (
        <div className="body">
            {!id &&
            (
                <h1>Login to continue</h1>
            )
            }
            {
                id && codes && !codeId &&(
                    <Modal codes={codes}/>
                
                )
            }
            {codes && codeId &&
                (<CodeEditor saveCode={saveCode} runCode={runCode} id = {codeId} user_id ={id}/>)}
            {codes && codeId && (<InputSection setInput={setInput} id = {codeId} user_id ={id}/>)}
            {codes && codeId && (<OutputSection outputData={outputData} id = {codeId} user_id ={id}/>)}
            
        </div>
    )
}

export default Body
