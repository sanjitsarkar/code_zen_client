import React,{useContext} from 'react'
import { OutputContext } from '../Body/Body'
import './footer.scss'
function Footer() {
    const outputCtx = useContext(OutputContext)
    const {output} = outputCtx
    return (
        <div className="footer">
           <p className="errors">{output?.data?.errors}</p>
        </div>
    )
}

export default Footer
