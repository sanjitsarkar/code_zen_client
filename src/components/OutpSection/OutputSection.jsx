import React, { useEffect, useState ,useContext} from 'react'
import './output_section.scss'
import {io} from "socket.io-client"
import { OutputContext } from '../Body/Body';
import Loading from '../Loader/Loader';
import  "./output_section.scss"
const SERVER = "http://127.0.0.1:5000";
// const socket = io(SERVER)
function OutputSection() {
    const outputCtx = useContext(OutputContext)
    const {output} = outputCtx
    const [_output, setOutput] = useState("")
    useEffect(() => {
         setOutput(output.data.output)
    }, [output])
   
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

    // useEffect(() => {
    //     setOutput(outputData.output)
    //     setErrors(outputData.errors)
    //     // socket.emit('output',output,id)
     
    // }, [outputData,output])
  
    return (
        <div className="output-section">
            <h1>Output</h1>
             {
                !output.loading?
            <textarea id="output" value={ _output } onChange={(e)=>{setOutput(e.target.value)}} ></textarea>:(<Loading/>)
             }
        </div>
    )
}

export default OutputSection
