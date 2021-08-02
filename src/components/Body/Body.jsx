import React, { useState } from 'react'
import CodeEditor from '../CodeEditor/CodeEditor'
import InputSection from '../InputSection/InputSection'
import OutputSection from '../OutpSection/OutputSection'
import  './body.scss'
function Body({ name, email, id }) {
    // const [code, setCode] = useState("")
    // const [title, setTitle] = useState("")
    // const [format, setFormat] = useState("")
    // const [lang, setLang] = useState("")
    const [inputData, setInputData] = useState("")
    const [outputData, setOutputData] = useState("")
    const [_id, set_Id] = useState("")

    const saveCode = async (e, title, code, format, lang) => {
        e.preventDefault()
        try {
            let response = await fetch("http://localhost:5000/save", {
                method: "POST",
                body: JSON.stringify({ title, code, format, lang }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                
            })
            response = await response.json()
            console.log("id",response.data._id);
            set_Id(response.data._id)
                
        }
        catch (e) {
            console.log(e);
            
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
    return (
        <div className="body">
            {!id &&
            (
                <h1>Login to continue</h1>
            )
            }
            {id &&
                (<CodeEditor saveCode={saveCode} runCode={runCode} />)}
            {id && (<InputSection setInput={setInput} />)}
            {id && (<OutputSection outputData={outputData} />)}
            
        </div>
    )
}

export default Body
