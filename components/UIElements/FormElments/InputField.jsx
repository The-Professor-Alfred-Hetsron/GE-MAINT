'use client'

import React, {useState, useEffect} from 'react'
import '../../../styles/formElements.css'

function InputField(props) {
    const [inputValue, setInputValue] = useState(props.defaultValue?props.defaultValue:"")

    useEffect(()=> {
        props.setNewValue(inputValue.trimEnd())
    },[inputValue, props])

  return (
    <>
        {props.type === "Number"?
          <div className="inputBox">
            <input required value={inputValue} type="number" min={props.minValue} max={props.maxValue} maxLength={1} onChange={(e)=>setInputValue(e.target.value.trimEnd())}/>
            <span>{props.label}</span>
          </div>
        :
        <div className="inputBox">
          <input required value={inputValue} type={props.label === "Email" ? "email" : "text"} onChange={(e)=>setInputValue(e.target.value.trimEnd())}/>
          <span>{props.label}</span>
        </div>
        }
    </>
  )
}

export default InputField