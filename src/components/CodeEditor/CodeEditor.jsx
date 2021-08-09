import React, { useEffect, useState,useContext,useRef, createRef } from 'react'
import { CodeContext } from '../App/App'
import AceEditor from 'react-ace'
// import socket from "../socket/socket"
// // import mode-<language> , this imports the style and colors for the selected language.
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-c_cpp'
// // there are many themes to import, I liked monokai.
import 'ace-builds/src-noconflict/theme-monokai'
// // this is an optional import just improved the interaction.
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import './code_editor.scss'
import Beautify from 'ace-builds/src-noconflict/ext-beautify'
var beautify = ace.require("ace/ext/beautify"); // get reference to extension
// var editor = ace.edit("editor"); // get reference to editor
// beautify.beautify(editor.session);
import {io} from "socket.io-client"
import Loading from '../Loader/Loader'
const SERVER = "http://127.0.0.1:5000";
const INTERVAL = 10000
function CodeEditor({ saveCode,runCode,_code,shareCode}) {

    // const codeCtx = useContext(CodeContext)
    // const {_code,dispatchCode}  = codeCtx
    // const [socket, setSocket] = useState("undefined.py")
    const languages = ["python", "c_cpp", "javascript"]
    const [compilerLanguage, setCompilerLanguage] = useState(languages[0])
   
    const [title, setTitle] = useState(_code.title)
    const [format, setFormat] = useState(_code.format)
    const [fileName, setFileName] = useState(title+"."+format)
    const [language, setLanguage] = useState(_code.lang)
    const [edit, setEdit] = useState(false)
    // const [loading, setLoading] = useState(false)
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [code, setCode] = useState(_code.code)
    const [run, setRun] = useState(false)
    const [toggleClass, setToggleClass] = useState("file-name")

//  console.log("id",id)
useEffect(() => {
    changeFileFormat(language)
}, [])
    const changeFileFormat = (lang)=>
    {
        if (lang === "python") {
            setFileName(fileName.split(".")[0] + ".py")
            setCompilerLanguage(lang)
        }
        else if (lang === "cpp") {
            setFileName(fileName.split(".")[0] + ".cpp")
            setCompilerLanguage(languages[1])
    if(code==="")

            setCode(`//Don't edit the default startup code

#include<bits/stdc++.h>

using namespace std;

int main() {



}`)

        }
        else if (lang === "c") {
            setFileName(fileName.split(".")[0] + ".c")
            setCompilerLanguage(languages[1])
    if(code==="")
            setCode(`//Don't edit the default startup code

#include<bits/stdc++.h>

using namespace std;

int main() {
    
    


}
`)

        }
        else if (lang === "javascript") {
            setFileName(fileName.split(".")[0] + ".js")
            setCompilerLanguage(lang)

        }
            
    }
//     useEffect(()=>{
// beautify.beautify()
//     },[])
    const toggleEdit = () => {
        setEdit(!edit)
        if (edit)
            setToggleClass("file-name edit")
        else
            setToggleClass("file-name")
            
    }
    const changeLangOption = (file_name) => {
         if (file_name.split(".")[1] === "py") {
            setLanguage(languages[0])
        }
        else if (file_name.split(".")[1] === "c") {
            setLanguage("c")

        }
        else if (fileName.split(".")[1] === "cpp") {
            setLanguage("cpp")

        }
        else if (fileName.split(".")[1] === "js") {
            setLanguage(languages[3])

        }
    }

    useEffect(() => {
        setFormat(fileName.split(".")[1])
        setTitle(fileName.split(".")[0])
       
    }, [fileName])

    useEffect(() => {
        if(language!=="python")
        beautify.beautify(ref.current.refEditor.env.editor.session);

    }, [])
    // const fetchCode = async() =>{
    //     // dispatchCode({type:"LOADING"})
    //     setLoading(true)
    //   setCode("Loading...")
    //   setFileName("Loading...")
    //   setLanguage("Loading...")


    // try{
    //   let response = await fetch("http://localhost:5000/code/"+id,{credentials:"include"})
    //   response = await response.json()
    //   setLoading(false)
    //   setCode(response.code)
    //   setFileName(response.title+"."+response.format)
    //   setLanguage(response.lang)
      

    
    // }
    // catch(e)
    // {
    //   setLoading(false)

    //     console.log(e.message)
    // // dispatchCode({type:"FAILURE",payload:e.message})
    
    // }
    // }
    // useEffect(() => {
      
     
    //    fetchCode()
       
    //   }, [])
    //   useEffect(() => {
    //     if(socket==null || code==null || id==null) return
    //     socket.emit("get_code",id,user_id)
        
    // }, [socket])
    // useEffect(() => {
    //     if(socket==null || code==null || id==null) return
    //     const interval = setInterval(() => {
    //         // console.log("saved",code,title,language,format)
    //         socket.emit("save_code",code,title,language,format)
    //     }, INTERVAL);
    //     return ()=>{
    //         clearInterval(interval)
    //     }
    // }, [socket,code])
   
   
    // useEffect(() => {
    //     if(socket==null || code==null || id==null) return
    //     socket.emit('send_code',code,language,format,title)
    //     // console.log("Send code",code,language,format,title)
    // }, [socket,code,title,language,format])

    // useEffect(() => {
    //     if(socket==null || code==null || id==null) return
    //     socket.on('receive_code',(_code,language,format,title)=>{
    //         console.log("Received Code",_code,language,format,title)
    //         setCode(_code)
    //         // setLanguage(language)
    //         // setFormat(format)
    //         // setTitle(title)
    //     })
        
    // }, [socket,code])
    const ref = createRef()
    // useEffect(() => {
    //     // console.log(ref.current.refEditor.env.editor.session)
       
    // }, [])
//   console.log(beautify.beautify())
   
  
    return (
        <div className="code-editor">
            {/* <Loader/> */}
            <div className="top-bar">
            
                <input className={toggleClass} value={fileName} onChange={(e) => { setFileName(e.target.value);
                
                }} onDoubleClick={() => { toggleEdit() }}/>
                
                <div className="right">
                    <div className="language">
                        <select name="language" id="" value={language} onChange={(e) => { setLanguage(e.target.value); changeFileFormat(e.target.value); }}>
                            <option value="python" >Python</option>
                            <option value="cpp" >C++</option>
                            <option value="c" >C</option>
                            <option value="javascript">Javascript</option>
                        </select>
                </div>
                    <div className="save" onClick={(e) => {
                        if(language!=="python")
        beautify.beautify(ref.current.refEditor.env.editor.session);
                        
                        saveCode(e, title, code, format, language)}}><i className="fas fa-save    "></i></div>
                    
                    <div className="run" onClick={(e) =>{ 
                        if(language!=="python")
                         beautify.beautify(ref.current.refEditor.env.editor.session);
                        runCode(e, title, code, format, language); setRun(!run)}}>
                       
                            <i className="fa fa-play" aria-hidden="true" ></i>
                        
                    </div>
                    <div className="share" onClick={(e) =>shareCode(e)}>
                       
                            <i className="fa fa-share" aria-hidden="true" ></i>
                        
                    </div>

                    </div>
          </div>
            <AceEditor
            ref = {ref}
                style={{
               
                height: '93%',
                    width: '100%',
                    background: 'hsl(209, 37%, 15%)'
            }}
                placeholder=''
                theme="monokai"
                mode={ compilerLanguage}
            onChange={currentCode => setCode(currentCode)}
            fontSize={18}
            commands={Beautify.commands}
            showPrintMargin={false}
                showGutter={true}
         
                highlightActiveLine={false}
                
            value={code}
            
                setOptions={{
                    
                    displayIndentGuides: true,
                    enableMultiselect: true,
                    fixedWidthGutter: true,
                    mergeUndoDeltas: "always",
                    spellcheck:true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
            
                showLineNumbers: true,
                animatedScroll: true,
                autoScrollEditorIntoView: true,
                enableEmmet: true,
                fadeFoldWidgets: true,
                tabSize: 4,
                cursorStyle:"smooth"
            }}
        />
             
        </div>
    )
    
        
}



export default CodeEditor
