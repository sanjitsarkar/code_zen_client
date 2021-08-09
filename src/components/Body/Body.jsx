import React, { useState,useEffect,useContext,useReducer, createContext } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import CodeEditor from '../CodeEditor/CodeEditor'
import InputSection from '../InputSection/InputSection'
import OutputSection from '../OutpSection/OutputSection'
import  './body.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CodeContext } from '../App/App'
import { ToastContext } from '../App/App'
import { saveCodeReducer,initialSaveCodeState } from '../../reducers/saveCodeReducer'
import { runCodeReducer,initialRunCodeState } from '../../reducers/runCodeReducer'
import Loading from '../Loader/Loader'
import Footer from '../Footer/Footer'
export const OutputContext = createContext()
export const SaveCodeContext = createContext()
function Body() {
    
  
   const codeCtx = useContext(CodeContext)
   const {_code,dispatchCode}  = codeCtx
   const toastCtx = useContext(ToastContext)
  const {notifySuccess,notifyInfo} = toastCtx
    const [inputData, setInputData] = useState("")
    const [outputData, setOutputData] = useState("")
  const [savedCode, dispatchSaveCode] = useReducer(saveCodeReducer, initialSaveCodeState)
  const [output, dispatchRunCode] = useReducer(runCodeReducer, initialRunCodeState)

    const codeId = useParams().id
    const handleSaveCode = async (e, title, code, format, lang) => {
        e.preventDefault()
        // const event = dispatchEvent(new KeyboardEvent())
        // console.log("Event",e)

        try {
            dispatchSaveCode({type:"LOADING"})
            console.log("Id",codeId)
            let response = await fetch("http://localhost:5000/save", {
                method: "POST",
                body: JSON.stringify({ title, code, format, lang,_id:codeId }),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                
            })
            response = await response.json()
            dispatchSaveCode({type:"SUCCESS",payload:response})
            notifySuccess("Saved...")
              
                
        }
        catch (e) {
            console.log(e);
            dispatchSaveCode({type:"FAILURE",payload:e.message})

         
            
        }
    }
    const setInput = (e, data) => {
        e.preventDefault()
        setInputData(data)
    }


    const handleRunCode = async(e, title, code, format, language) => {
        
        e.preventDefault()
        dispatchRunCode({type:"LOADING"})
        await handleSaveCode(e, title, code, format, language)
        
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
                body: JSON.stringify({ id:codeId,input:Idata}),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                
            })
                response = await response.json()
                console.log("Response",response);
                dispatchRunCode({type:"SUCCESS",payload:response})
            notifySuccess("Compiled...")
                
              
                
        }
        catch (e) {
            console.log(e);
            dispatchRunCode({type:"FAILURE",payload:e.message})
            
        }
        
     
    }
    

const fetchCode = async() =>{
    dispatchCode({type:"LOADING"})
try{
  let response = await fetch("http://localhost:5000/code/"+codeId,{credentials:"include"})
  response = await response.json()
dispatchCode({type:"SUCCESS",payload:response})

//   console.log("code",code)
}
catch(e)
{
    console.log(e.message)
dispatchCode({type:"FAILURE",payload:e.message})

}
}

const shareCode = ()=>{
    notifyInfo("Copy the url to share the code",{autoClose:3000})
}

    useEffect(() => {
        fetchCode()
        
    }, [])
    return (
    <OutputContext.Provider value={{output}}>

        <div className="body">
{
            
        
             

                    !_code.loading ?(
                        !_code?.data?.status ?(
                    <>
            <CodeEditor saveCode={handleSaveCode} runCode={handleRunCode} _code = {_code.data} shareCode = {shareCode}/>
            <InputSection setInput={setInput}  />
            <OutputSection />
            <Footer/>
                    </>):(
                     
                            <Redirect to="/" />
                            // _code?.data?.status
                         

                    )
                    ):(
                        <Loading/>
                    )
                
                
            

            }

        </div>
   
    </OutputContext.Provider>
    )
}

export default Body
