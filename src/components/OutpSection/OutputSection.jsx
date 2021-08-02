import React, { useEffect, useState } from 'react'
import './output_section.scss'
function OutputSection({ outputData }) {
    const [output, setOutput] = useState(outputData.output)
    const [errors, setErrors] = useState(outputData.errors)
    useEffect(() => {
        setOutput(outputData.output)
        setErrors(outputData.errors)
    },[outputData])
    return (
        <div className="output-section">
            <h1>Output</h1>
             <div className="error">{errors}</div>
            <textarea id="output" value={ output } onChange={(e)=>{setOutput(e.target.value)}} ></textarea>
        </div>
    )
}

export default OutputSection
