import React, { useState,useEffect,useContext,useReducer, createContext } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import CodeEditor from '../CodeEditor/CodeEditor'
import InputSection from '../InputSection/InputSection'
import OutputSection from '../OutpSection/OutputSection'
import  './body.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext, CodeContext } from '../App/App'
import { ToastContext } from '../App/App'
import { saveCodeReducer,initialSaveCodeState } from '../../reducers/saveCodeReducer'
import { runCodeReducer,initialRunCodeState } from '../../reducers/runCodeReducer'
import Loading from '../Loader/Loader'
import Footer from '../Footer/Footer'
import hostUrl from '../../env'
export const OutputContext = createContext()
export const SaveCodeContext = createContext()
// import {io} from "socket.io-client"
// const SERVER = "https://codezzen.herokuapp.com";
function Body() {
  
 
   const codeCtx = useContext(CodeContext)
   const {_code,dispatchCode}  = codeCtx
   const authCtx = useContext(AuthContext)
   const {_auth}  = authCtx
   const toastCtx = useContext(ToastContext)
  const {notifySuccess,notifyInfo,notifyError} = toastCtx
    const [inputData, setInputData] = useState("")
    const [share, setShare] = useState(_code?.data?.share)
    const [outputData, setOutputData] = useState("")
  const [savedCode, dispatchSaveCode] = useReducer(saveCodeReducer, initialSaveCodeState)
  const [output, dispatchRunCode] = useReducer(runCodeReducer, initialRunCodeState)

    const codeId = useParams().id
//   const [socket,setSocket] = useState(io(SERVER))

//     useEffect(() => {
//         const s = io(SERVER)
//         setSocket(s)
//         // console.log(s)
       
//         return () => {
//             s.disconnect()
//         }
//     }, [])
//    useEffect(() => {
//        socket.emit("input",(inputData,codeId))
//        socket.on("input",(input)=>{
//         // console.log("inputData",input)

//         setInputData(input)
//        })
//    },[socket,inputData])
  
      
    
   
   
// useEffect(() => {
//     // console.log("cedit",_code?.user_id,user_id)
//     // console.log("share",share)
//     // if(_code.data.user_id!==_auth?.data?.user?.id)
//     // {
//         console.log("getting user_id",_code.data.user_id,_auth?.data?.user?.id)
//     //        if(_code?.data?.user_id!==_auth?.data?.user?.id && _code?.data?.user_id!==undefined)
//     // {
//         socket.on("send_share",(_share)=>{
//         console.log("Share is getting ",_share)

//             // if(!_share){
//             //     window.location.assign("/")
//             // }
//         })
//     // }
    
// }, [socket])
    
    const handleSaveCode = async (e, title, code, format, lang) => {
        e.preventDefault()
        // const event = dispatchEvent(new KeyboardEvent())
        // console.log("Event",e)

        try {
            dispatchSaveCode({type:"LOADING"})
            console.log("Id",codeId)
            let response = await fetch(hostUrl+"save", {
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
        // && _code.data.user_id!==undefined
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
                    
            let response = await fetch(hostUrl+"compile", {
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
  let response = await fetch(hostUrl+"code/"+codeId,{credentials:"include"})
  response = await response.json()
 setShare(response.share)
dispatchCode({type:"SUCCESS",payload:response})

//   console.log("code",code)
}
catch(e)
{
    console.log(e.message)
dispatchCode({type:"FAILURE",payload:e.message})

}
}

const shareCode = async()=>{
    if(_code?.data?.user_id===_auth?.data?.user?.id)
    {
        const response = await fetch(hostUrl+"code/"+_code?.data?._id,{
            credentials:"include",
            method: "POST",
            body: JSON.stringify({ share:!share}),
            headers: { "Content-Type": "application/json" },

        })
        
        setShare(!share)
        console.log(await response.json())
        if(!share)
        notifySuccess("Copy the url to share the code",{autoClose:3000})
        else
        notifyInfo("Disabled sharing",{autoClose:3000})

    }
   
}

    useEffect(() => {
        fetchCode()
        
    }, [])
    // useEffect(() => {
    //     console.log("IP",inputData)
    // }, [inputData])

    // useEffect(() => {
        // console.log("_code?.data?.share",_code?.data?.share)
        // setShare(_code?.data?.share)
        
    // }, [_code?.data?.share])
//     useEffect(() => {
//         console.log(_code?.data?.user_id,_auth?.data?.user?.id)

//         if( _code.data.user_id!==_auth.data.user.id && _auth.data.user_id!==undefined)
// {
//     notifyError("Your are not authorized to view this code")
// }

        
//     }, [_code.data.user_id])
    // console.log("_code?.data?.user_id",_code?.data?.user_id)
    //     console.log("_auth?.data?.user.id",_auth?.data?.user?.id)
    //     console.log("_code?.data?.share",_code?.data?.share)
    return (
    <OutputContext.Provider value={{output}}>

        <div className="body">
{
            
        
             

                    !_code.loading ?(
                        !_code?.data?.status &&((_code?.data?.user_id===_auth?.data?.user?.id)||(_code?.data?.share===true))?(
                    <>
            <CodeEditor saveCode={handleSaveCode} runCode={handleRunCode} _code = {_code.data} shareCode = {shareCode} share = {share} user_id = {_auth?.data?.user?.id}/>
            <InputSection setInput={setInput} codeId={codeId}  />
            <OutputSection codeId={codeId} />
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
