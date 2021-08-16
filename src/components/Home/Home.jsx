import React, { useEffect, useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { CodeContext, CodesContext } from '../App/App'
import Loading from '../Loader/Loader'
import { ToastContext } from '../App/App'
import useInput from '../hooks/useInput'
import "./Home.scss"
import { toast } from 'react-toastify'
const Home = () => {
    const codesCtx = useContext(CodesContext)
    const codeCtx = useContext(CodeContext)
    const toastCtx = useContext(ToastContext)
    const {notifyError,notifySuccess} = useContext(ToastContext)
    const {_code} = codeCtx
    const {_codes,dispatchCodes}  = codesCtx
    const [fileName, bindFileName,resetFileName] = useInput("")
    const [language, bindLanguage,resetLanguage] = useInput("python")
    const [search, bindSearch,resetSearch] = useInput("")

    useEffect(() => {
        if(_code.data.status)
       notifyError(_code?.data?.status,{autoClose:2000})
       _code.data.status=""
    }, [_code?.data?.status])

    const fetchCodes = async() =>{
        try{
        dispatchCodes({type:"LOADING"})
    
      let response = await fetch("https://codezzen.herokuapp.com/codes",{credentials:"include"})
      response = await response.json()
      dispatchCodes({type:"SUCCESS",payload:response})
    
  
    }
    catch(e)
    {
        console.log(e.message)
        dispatchCodes({type:"FAILURE",payload:e.message})
    
    }
    }

    const searchCodes = async(e) =>{
        try{
            e.preventDefault()
            if(search==="")
            {
                notifyError("Please enter something to search")
                return
            }
        dispatchCodes({type:"LOADING"})
    
      let response = await fetch("https://codezzen.herokuapp.com/codes",{credentials:"include",
    method:"POST",
    body:JSON.stringify({search}),
    headers: {"Content-Type":"application/json"}

    })
      response = await response.json()
      dispatchCodes({type:"SUCCESS",payload:response})
    
  
    }
    catch(e)
    {
        console.log(e.message)
        dispatchCodes({type:"FAILURE",payload:e.message})
    
    }
    }
    const handleSubmit = async(e) => {
        e.preventDefault()

        if(fileName==="" || language==="")
{
    notifyError("Please enter filename")
    return
}
const format = {
    "python":"py",
    "c":"c",
    "cpp":"cpp",
    "javascript":"js"
}
        let response = await fetch("https://codezzen.herokuapp.com/save", {
                method: "POST",
                body: JSON.stringify({ title:fileName, code:"", format:format[language], lang:language}),
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                
            })
            response = await response.json()
            window.location.assign("/code/"+response?.data?._id)
            // console.log(response?.data?._id)
    }
   
  
//         try{
// // resetSearch()
//         }
//         catch(e)
//         {
//             console.log(e.message)
//             // resetSearch()

//        
const deleteCode = async(e,id) =>{
    e.preventDefault()
    // alert("hello")
    try{
    // dispatchCodes({type:"LOADING"})

  let response = await fetch("https://codezzen.herokuapp.com/code/"+id, {
    method: "DELETE",
    body: JSON.stringify({ id}),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    
})
  response = await response.json()
  notifySuccess("Deleted Successfully")
  await fetchCodes()
//   _codes.data=_codes.data.filter((code)=>code.id!==id)
//   dispatchCodes({type:"SUCCESS"useEffect(() => {
    //     if(_code?.data?.user_id===_auth?.data?.user?.id)
    //     {
    //         console.log("Share is sending ",share)

    //     socket.emit("share",share)
    //     }
        
    // }, [socket,share]),payload:response})


}
catch(e)
{
    console.log(e.message)
  notifyError("Error deleting the file")

    // dispatchCodes({type:"FAILURE",payload:e.message})

}
}
const langImgUrl = {
    "python":<svg viewBox="0 0 128 128">
    <linearGradient id="python-original-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#5A9FD4"></stop><stop offset="1" stop-color="#306998"></stop></linearGradient><linearGradient id="python-original-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#FFD43B"></stop><stop offset="1" stop-color="#FFE873"></stop></linearGradient><path fill="url(#python-original-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"></path><path fill="url(#python-original-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"></path><radialGradient id="python-original-c" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#B8B8B8" stop-opacity=".498"></stop><stop offset="1" stop-color="#7F7F7F" stop-opacity="0"></stop></radialGradient><path opacity=".444" fill="url(#python-original-c)" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"></path>
    </svg>,
    "c":<svg viewBox="0 0 128 128">
    <path fill="#659AD3" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"></path><path fill="#03599C" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"></path><path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"></path>
    </svg>,
    "cpp":<svg viewBox="0 0 128 128">
    <path fill="#D26383" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"></path><path fill="#9C033A" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"></path><path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"></path><path d="M82.1 61.8h5.2v-5.3h4.4v5.3H97v4.4h-5.3v5.2h-4.4v-5.2h-5.2v-4.4zm18.5 0h5.2v-5.3h4.4v5.3h5.3v4.4h-5.3v5.2h-4.4v-5.2h-5.2v-4.4z" fill="#fff"></path>
    </svg>,
    "javascript":<svg viewBox="0 0 128 128">
    <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"></path><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"></path>
    </svg>
}
    useEffect(() => {
       fetchCodes()
    }, [])
    useEffect(() => {
    if(search==="")
       fetchCodes()

    }, [search])
   
    return (
        <div id="home">

            <div className="saved_codes">
                

               
                  <form id="search" onSubmit={(e)=>searchCodes(e)}>
                        <input id="search-field" type="text"  placeholder="Search code" {...bindSearch} onSubmit={(e)=>searchCodes(e)}/>
                        <button onSubmit={(e)=>searchCodes(e)}>
                            <i className="fa fa-search"></i>
                        </button>
                        </form>
                    <h2>Saved Codes</h2>
                    <ul className="code-list">
                   
                    {
                        _codes.loading?(
                            <Loading/>
                        ):(
                            _codes.data.length?(
                        
                                _codes.data.map((code)=>
                                    <li key={code._id}>
                                        
                                         {langImgUrl[code.lang]}
                                        <Link to={"/code/"+code._id}>{code.title}.{code.format}</Link>
                                        <div className="delete" onClick={(e)=>{deleteCode(e,code._id)}}><i className="fa fa-trash"/></div>
                                        </li>
                                )
                            ):(<p>There is no any saved codes </p>)
                        )
                    
                            }
                    </ul>
   

            </div>
            <form on onSubmit={handleSubmit} id="right">
                <div className="file-name">
                <input type="text" placeholder="File name" {...bindFileName}/>
                <select name="language" id="" {...bindLanguage}>
                            <option value="python" >Python</option>
                            <option value="cpp" >C++</option>
                            <option value="c" >C</option>
                            {/* <option value="javascript">Javascript</option> */}
                        </select>
                        </div>
                <button>Create</button>
            </form>
        </div>
    )
}

export default Home
