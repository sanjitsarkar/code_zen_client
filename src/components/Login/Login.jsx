import React, { useContext  } from 'react'
import useInput from '../hooks/useInput'
import Modal from 'react-modal'
import { AuthContext,ToastContext } from '../App/App'
import "./Login.scss"
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
         
        width:"25%",
      boxShadow:"0 0 1em rgba(0,0,0,.3)"
      }
  
    // content: {
    //     top: '50%',
    //     left: '50%',
    //     right: 'auto',
    //     bottom: 'auto',
    //     marginRight: '-50%',
    //     transform: 'translate(-50%, -50%)',
    //     //   backgroundColor:'dodgerBlue',
    //     width:"25%",
    //   boxShadow:"0 0 1em rgba(0,0,0,.3)"
    // },
  };
function Login({isModalOpen,closeModal}) {
    const authCtx = useContext(AuthContext)
    const toastCtx = useContext(ToastContext)
    const {notifyError} = useContext(ToastContext)
    const {_auth,dispatchAuth}  = authCtx
    const [password, bindPassword,resetPassword] = useInput("")
    const [email, bindEmail,resetEmail] = useInput("")
   
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
    dispatchAuth({type:"LOADING"})
            let response = await fetch("https://codezzen.herokuapp.com/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                credentials: "include",
                headers: {"Content-Type":"application/json"},
                
            })
            response = await response.json()
            resetEmail()
            resetPassword()
            if(response.errors){
            notifyError(response.errors,{autoClose:2000})
            dispatchAuth({type:"FAILURE",payload:response.errors})
            
            }
            else{
            dispatchAuth({type:"SUCCESS",payload:response})
            }
                
    }
        catch (e) {
            console.log("error",e.message);
    dispatchAuth({type:"FAILURE",payload:e.message})

            
    }
    }
  
    return (
        <Modal
        // overlayClassName="overlay"
         id="modal-login"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        shouldCloseOnEsc="true"
        shouldCloseOnOverlayClick="true"
        style={customStyles}
        contentLabel="Signup"
        >
            <form id="login" onSubmit={(e) => { handleLogin(e)}}>
                <input type="email" {...bindEmail} placeholder="Email" required/>
                <input type="password" {...bindPassword} placeholder="Password" required/>
                <button type="submit">Login</button>
            </form>
        </Modal>
    )
}

export default Login
