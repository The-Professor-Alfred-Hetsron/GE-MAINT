'use client'

import React, {useState, useEffect} from 'react'
import '@/styles/formElements.css'

function InputField(props) {
    const [inputValue, setInputValue] = useState(props.defaultValue?props.defaultValue:(props.type === "Number"?0:""))

    useEffect(()=> {
        props.setNewValue(inputValue)
    },[inputValue, props])

  return (
    <>
        {props.type === "Number"?
          <div className="inputBox">
            <input required value={inputValue} type="number" min={props.minValue} max={props.maxValue} maxLength={1} onChange={(e)=>setInputValue(Number(e.target.value))} disabled={props.disabled?props.disabled:false}/>
            <span className='capitalize'>{props.label}</span>
          </div>
        :
        <div className="inputBox">
          <input required value={inputValue} type={props.label === "Email" ? "email" : "text"} disabled={props.disabled?props.disabled:false} onChange={(e)=>setInputValue(e.target.value)}/>
          <span className='capitalize'>{props.disabled?"":props.label}</span>
        </div>
        }
    </>
  )
}

export default InputField