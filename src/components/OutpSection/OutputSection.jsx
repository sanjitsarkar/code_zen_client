import React, { useEffect, useState,useRef } from 'react'
import './output_section.scss'
import {io} from "socket.io-client"
const SERVER = "http://127.0.0.1:5000";
// const socket = io(SERVER)
function OutputSection({ outputData,id }) {
    const [output, setOutput] = useState(outputData.output)
    const [errors, setErrors] = useState(outputData.errors)
    
    
    // const socketInstance = useRef(null);
    
    // useEffect(() => {
    //     socketInstance.current = io(SERVER);
    //   if(socket.connected)
    //   {
    //   socket.on('output', (output) => {

    //    console.log("output Recieved",output)
    //    setOutput(output)
    //   })
    // }

  
    //   return () => {
    //     socket.disconnect();
    //   }
    // }, [])

    useEffect(() => {
        setOutput(outputData.output)
        setErrors(outputData.errors)
        // socket.emit('output',output,id)
     
    }, [outputData,output])
  
    return (
        <div className="output-section">
            <h1>Output</h1>
             <div className="error">{errors}</div>
            <textarea id="output" value={ output } onChange={(e)=>{setOutput(e.target.value)}} ></textarea>
        </div>
    )
}

export default OutputSection
