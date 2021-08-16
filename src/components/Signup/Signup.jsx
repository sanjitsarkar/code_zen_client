import React, { useState,useContext} from 'react'
import { AuthContext, ToastContext } from '../App/App'
import useInput from '../hooks/useInput'
import Modal from 'react-modal'
import "../Login/Login.scss"
const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(1, 1, 1, 0.75)'
      },
      content: {
           top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        //   backgroundColor:'dodgerBlue',
        width:"25%",
      boxShadow:"0 0 1em rgba(0,0,0,.3)"
      }
  };
  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#root');
function Signup({isModalOpen,closeModal}) {
    const toastCtx = useContext(ToastContext)
    const {notifyError} = useContext(ToastContext)
    const authCtx = useContext(AuthContext)
   const {_auth,dispatchAuth}  = authCtx
   
    const [name, bindName,resetName] = useInput("")
    const [password, bindPassword,resetPassword] = useInput("")
    const [email, bindEmail,resetEmail] = useInput("")

 
    const handleSignup = async (e) => {
        e.preventDefault()
        try {
    dispatchAuth({type:"LOADING"})

            let response = await fetch("https://codezzen.herokuapp.com/signup", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                credentials: "include",
                headers: {"Content-Type":"application/json"},
                
            })
            response = await response.json()
            if(response.errors){
                if(response.errors.includes("duplicate"))
                {
                notifyError("Account with this email already exists",{autoClose:2000})

                }
                else{
                notifyError(response.errors,{autoClose:4000})
                }
                dispatchAuth({type:"FAILURE",payload:response.errors})
                }
                else{
                dispatchAuth({type:"SUCCESS",payload:response})
                }
    resetName()
    resetEmail()
    resetPassword()

                
    }
        catch (e) {
            console.log(e);
    dispatchAuth({type:"FAILURE",payload:e.message})
            
    }
    }
    return (
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Signup"
        >
            <form id="signup" onSubmit={(e) => { handleSignup(e)} }>
                <input type="text"  {...bindName} placeholder="Full name" required/>
                <input type="email" {...bindEmail} placeholder="Email" required/>
                <input type="password" {...bindPassword} placeholder="Password" required/>
                <button type="submit">Signup</button>
            </form>
            </Modal>

    )
}

export default Signup
