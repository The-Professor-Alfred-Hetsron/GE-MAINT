'use client'

import React, {useState, useEffect} from 'react'
import '../../../styles/formElements.css'

function InputField(props) {
    const [inputValue, setInputValue] = useState("")

    useEffect(()=> {
        props.setNewValue(inputValue)
    },[inputValue, props])

  return (
    <div className="inputBox">
        <input required type={props.label === "Email" ? "email" : "text"} onChange={(e)=>setInputValue(e.target.value.trimEnd())}/>
        <span>{props.label}</span>
    </div>
  )
}

export default InputField