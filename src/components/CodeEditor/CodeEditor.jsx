import React, { useEffect, useState } from 'react'
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
// import { instrument } from '@socket.io/admin-ui'
import {io} from "socket.io-client"
const SERVER = "http://127.0.0.1:5000";
const INTERVAL = 10000
function CodeEditor({ saveCode,runCode,id,user_id}) {
    const [socket, setSocket] = useState("undefined.py")
    const languages = ["python", "c_cpp", "javascript"]
    const [compilerLanguage, setCompilerLanguage] = useState(languages[0])

    const [fileName, setFileName] = useState("")
    const [title, setTitle] = useState(fileName.split(".")[0])
    const [format, setFormat] = useState(fileName.split(".")[1])
    const [language, setLanguage] = useState(languages[0])
    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [code, setCode] = useState()
    const [run, setRun] = useState(false)
    const [toggleClass, setToggleClass] = useState("file-name")

//  console.log("id",id)
    const changeFileFormat = (lang)=>
    {
        if (lang === "python") {
            setFileName(fileName.split(".")[0] + ".py")
            setCompilerLanguage(lang)
        }
        else if (lang === "cpp") {
            setFileName(fileName.split(".")[0] + ".cpp")
            setCompilerLanguage(languages[1])

        }
        else if (lang === "c") {
            setFileName(fileName.split(".")[0] + ".c")
            setCompilerLanguage(languages[1])

        }
        else if (lang === "javascript") {
            setFileName(fileName.split(".")[0] + ".js")
            setCompilerLanguage(lang)

        }
            
    }
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

    useEffect(async() => {
        if(!id) return
        // console.log(id,"id")
        const s = io(SERVER)
        setSocket(s)
        const response = await fetch("http://localhost:5000/code/"+id,{
            credentials:"include"
        })
        const _code = await response.json()
        // console.log(_code)
        setCode(_code.code)
        setFileName(_code.title+"."+_code.format)
        setLanguage(_code.lang)
        return ()=>{
            s.disconnect()
        }
      }, [])
      useEffect(() => {
        if(socket==null || code==null || id==null) return
        socket.emit("get_code",id,user_id)
        
    }, [socket])
    useEffect(() => {
        if(socket==null || code==null || id==null) return
        const interval = setInterval(() => {
            // console.log("saved",code,title,language,format)
            socket.emit("save_code",code,title,language,format)
        }, INTERVAL);
        return ()=>{
            clearInterval(interval)
        }
    }, [socket,code])
   
   
    useEffect(() => {
        if(socket==null || code==null || id==null) return
        socket.emit('send_code',code,language,format,title)
        // console.log("Send code",code,language,format,title)
    }, [socket,code,title,language,format])

    useEffect(() => {
        if(socket==null || code==null || id==null) return
        socket.on('receive_code',(_code,language,format,title)=>{
            console.log("Received Code",_code,language,format,title)
            setCode(_code)
            // setLanguage(language)
            // setFormat(format)
            // setTitle(title)
        })
        
    }, [socket,code])
    
 

    return (
        <div className="code-editor">
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
                    <div className="save" onClick={(e) => saveCode(e, title, code, format, language)}><i className="fas fa-save    "></i></div>
                    <div className="run" onClick={(e) => runCode(e, title, code, format, language)}>
                        {  !run?
                            (<i className="fa fa-play" aria-hidden="true" ></i> ):
                            (<i className="fa fa-pause" aria-hidden="true"></i>)
                        }
                    </div>
                    </div>
          </div>
            <AceEditor
                
                style={{
               
                height: '93%',
                    width: '100%',
                    background: 'hsl(210, 28%, 12%)'
            }}
                placeholder=''
                theme="monokai"
                mode={ compilerLanguage}
            onChange={currentCode => setCode(currentCode)}
            fontSize={18}
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
