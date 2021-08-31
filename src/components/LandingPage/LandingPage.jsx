import React,{useState} from 'react'
import Signup from '../Signup/Signup'
import "./landing_page.scss"

const LandingPage = () => {
    const [isModalOpenSignup, setIsModalOpenSignup] = useState(false)
    return (
        <div id="landing-page">
             <Signup isModalOpen={isModalOpenSignup} closeModal={()=>setIsModalOpenSignup(false)}/>
            <div className="top">
                <h2>Share and run your Code in realtime</h2>
                <p>An online editor competitive coder, interviews, teaching and many more...</p>
                <button onClick={(e) => { setIsModalOpenSignup(!isModalOpenSignup) }}>Register Now</button>
            </div>
            {/* <img srcSet={CodeIMG}/> */}
        </div>
    )
}

export default LandingPage
