import React, { useEffect, useState,useReducer,createContext } from 'react'
import Body from '../Body/Body'
import Header from '../Header/Header'
import './App.scss'
import '../Body/body.scss'
import Loading from '../Loader/Loader'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import {initialAuthState,authReducer} from '../../reducers/authReducer'
import { initialCodesState,codesReducer } from '../../reducers/codesReducer'
import { initialCodeState,codeReducer } from '../../reducers/codeReducer'
import Home from '../Home/Home'
import hostUrl from '../../env'
import { toast, ToastContainer } from 'react-toastify'
import LandingPage from '../LandingPage/LandingPage'
export const AuthContext = createContext()
export const CodeContext = createContext()
export const CodesContext = createContext()
export const ToastContext = createContext()
export default function App() {
  const [_auth, dispatchAuth] = useReducer(authReducer, initialAuthState)
  const [_code, dispatchCode] = useReducer(codeReducer, initialCodeState)
  const [_codes, dispatchCodes] = useReducer(codesReducer, initialCodesState)
  // const [user, setUser] = useState("")
  // const [loading,setLoading] = useState(true)
  const notifySuccess= (msg,options={}) => toast.success(msg,options);
  const notifyWarn= (msg,options={}) => toast.warn(msg,options);
  const notifyWarning= (msg,options={}) => toast.warning(msg,options);
  const notifyDark= (msg,options={}) => toast.dark(msg,options);
  const notifyError= (msg,options={}) => toast.error(msg,options);
  const notifyInfo= (msg,options={}) => toast.info(msg,options);

  const getUser = async () => {
    try {
    dispatchAuth({type:"LOADING"})
      let response = await fetch(hostUrl+"user", {credentials:"include"})
      response = await response.json()
      // console.log(response?.user);
    dispatchAuth({type:"SUCCESS",payload:response})
    }
    catch (e) {
      console.log(e);
    dispatchAuth({type:"FAILURE",payload:e.message})

    }

  }
  useEffect( () => {
   getUser()
  }, [])

 
  return (
    <ToastContext.Provider value={{notifySuccess,notifyWarn,notifyDark,notifyError,notifyWarning,notifyInfo}}>
    <AuthContext.Provider value={{_auth,dispatchAuth}}>
    <CodeContext.Provider value={{_code,dispatchCode}}>
    <CodesContext.Provider value={{_codes,dispatchCodes}}>
    <>
    <ToastContainer
position="top-right"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    <div className="app">
     
      {

        !_auth?.loading &&
          (<Header/>) 
      }
      <Switch>
      <Route path="/" exact>
       {
       
       _auth.loading ?(<Loading/>):
          
          
        
          (
            <>
            {!_auth?.data?.user ?(
<LandingPage/>
          ):
          (
            // <h1>Logged</h1>
            <Home/>
                      )}
      {/* <Footer/> */}

                      </>
                      )
         
          
}
        </Route>
        <Route path="/code/:id">
          {
           _auth?.loading?(null):(
             _auth?.data?.user?(
               <>
               <Body/>
               {/* <Footer/> */}
               </>
             ):(
               <Redirect to="/" />
             )
             
             
           )
          
          }
        </Route>
        <Route>
          <h1>404 - NOT FOUND :(</h1>
        </Route>
       
      </Switch>

      
    </div>
    </>
   
    </CodesContext.Provider>
    </CodeContext.Provider>
    </AuthContext.Provider>
    </ToastContext.Provider>
    
  )
}

