import React, { useEffect, useState ,useContext} from 'react'
import './output_section.scss'
import {io} from "socket.io-client"
import { OutputContext } from '../Body/Body';
import Loading from '../Loader/Loader';
import  "./output_section.scss"
const SERVER = "https://codezzen.herokuapp.com";
const socket = io(SERVER)
function OutputSection({codeId}) {
    const outputCtx = useContext(OutputContext)
    const {output} = outputCtx
    const [_output, setOutput] = useState(output?.data?.output)
    useEffect(() => {
         setOutput(output.data.output)

    }, [output])
   
    // const [socket,setSocket] = useState(io(SERVER))

    // useEffect(() => {
    //     const s = io(SERVER)
    //     setSocket(s)
    //     // console.log(s)
       
    //     return () => {
    //         s.disconnect()
    //     }
    // }, [])

    // useEffect(() => {
    //     socket.emit("output",_output,codeId)
    //     socket.on("output",(_output)=>{
    //         console.log("outputData",_output)
    //      setOutput(_output)
    //     })
    // },[socket,_output,output])
  

  
  
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
