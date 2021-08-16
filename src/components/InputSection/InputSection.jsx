import React, { useState,useRef,useEffect } from 'react'
import './input_section.scss'
import {io} from "socket.io-client"
const SERVER = "https://codezzen.herokuapp.com";
const socket = io(SERVER)
function InputSection({ setInput,codeId}) {
    const [InputData, setInputData] = useState("")
    // const [socket,setSocket] = useState(io(SERVER))

    // useEffect(() => {
    //     const s = io(SERVER)
    //     setSocket(s)
    //     // console.log(s)
       
    //     return () => {
    //         s.disconnect()
    //     }
    // }, [])
//    useEffect(() => {
//        socket.emit("input",InputData,codeId)
//        socket.on("input",(input)=>{
//         // console.log("inputData",input)

//         setInputData(input)
//        })
//    },[socket,InputData])
    return (
        <div className="input-section">
            <h1>Input</h1>
            <textarea id="input" onChange={(e) => { setInput(e, e.target.value);setInputData(e.target.value) }} defaultValue={ InputData}></textarea>
        </div>
    )
}

export default InputSection
