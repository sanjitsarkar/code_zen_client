import React, { useState,useRef,useEffect } from 'react'
import './input_section.scss'
import {io} from "socket.io-client"
const SERVER = "http://127.0.0.1:5000";
// const socket = io(SERVER)
function InputSection({ setInput}) {
    const [InputData, setInputData] = useState("")
    // const socketInstance = useRef(null);
    
    // useEffect(() => {
    //     socketInstance.current = io(SERVER);
    //   if(socket.connected)
    //   {
    //   socket.on('input', (input) => {

    //    console.log("Input Recieved",input)
    //    setInputData(input)
    //    setInput(InputData)
    //   })
    // }

  
    //   return () => {
    //     socket.disconnect();
    //   }
    // }, [])

    // useEffect(() => {
        
      
    //     socket.emit('input',InputData,id)
      
  
    
     
    // }, [InputData])
    return (
        <div className="input-section">
            <h1>Input</h1>
            <textarea id="input" onChange={(e) => { setInputData(e.target.value); setInput(e, e.target.value) }} defaultValue={ InputData}></textarea>
        </div>
    )
}

export default InputSection
