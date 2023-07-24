'use client'

import React, {useState, useEffect} from 'react'
import '@/styles/formElements.css'

function DateInputField(props) {
    const [inputValue, setInputValue] = useState(props.defaultValue?Date(props.defaultValue):"")

    useEffect(()=> {
        props.setNewValue(`${inputValue}`)
    },[inputValue, props])

  return (
    <div className="inputBox">
        <input required value={inputValue} type="date" onChange={(e)=>setInputValue(e.target.value)}/>
        <span>{props.label}</span>
    </div>
  )
}

export default DateInputField