import React, { useEffect, useState } from 'react'
import AceEditor from 'react-ace'
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
function CodeEditor({ saveCode,runCode}) {
    const languages = ["python", "c_cpp", "javascript"]
    const [compilerLanguage, setCompilerLanguage] = useState(languages[0])

    const [fileName, setFileName] = useState("untitled.py")
    const [title, setTitle] = useState(fileName.split(".")[0])
    const [format, setFormat] = useState(fileName.split(".")[1])
    const [language, setLanguage] = useState(languages[0])
    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [code, setCode] = useState()
    const [run, setRun] = useState(false)
    const [toggleClass, setToggleClass] = useState("file-name")
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

    // const runCode = ()=>
    // {
    //     setRun((run) => run = !run)
    // }
   
    useEffect(() => {
        setFormat(fileName.split(".")[1])
        setTitle(fileName.split(".")[0])
       
    }, [fileName])

    return (
        <div className="code-editor">
            <div className="top-bar">
                <input className={toggleClass} value={fileName} onChange={(e) => { setFileName(e.target.value) }} onDoubleClick={() => { toggleEdit() }}/>
                <div className="right">
                    <div className="language">
                        <select name="language" id="" onChange={(e) => { setLanguage(e.target.value); changeFileFormat(e.target.value); }}>
                            <option value="python" selected={ language==="python"}>Python</option>
                            <option value="cpp" selected={ language==="cpp"}>C++</option>
                            <option value="c" selected={ language==="c"}>C</option>
                            <option value="javascript" selected={ language==="javascript"}>Javascript</option>
                        </select>
                </div>
                    <div className="save" onClick={(e) => saveCode(e, title, code, format, language)}><i class="fas fa-save    "></i></div>
                    <div className="run" onClick={(e) => runCode(e, title, code, format, language)}>
                        {  !run?
                            (<i class="fa fa-play" aria-hidden="true" ></i> ):
                            (<i class="fa fa-pause" aria-hidden="true"></i>)
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
