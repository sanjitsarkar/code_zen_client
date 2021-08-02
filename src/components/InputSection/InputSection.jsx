import React, { useState } from 'react'
import './input_section.scss'
function InputSection({ setInput }) {
    const [InputData, setInputData] = useState("")
    return (
        <div className="input-section">
            <h1>Input</h1>
            <textarea id="input" onChange={(e) => { setInputData(e.target.value); setInput(e, e.target.value) }}>{ InputData}</textarea>
        </div>
    )
}

export default InputSection
