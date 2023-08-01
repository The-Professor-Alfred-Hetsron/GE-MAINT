'use client'

import React, {useState, useEffect} from 'react'
import '@/styles/formElements.css'

function DateInputField(props) {
  const actualDate = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`
    const [inputValue, setInputValue] = useState(props.defaultValue?props.defaultValue:actualDate)

    useEffect(()=> {
        props.setNewValue(`${inputValue}`)
    },[inputValue, props])

  return (
    <div className="inputBox">
        <input required value={inputValue} type="date" min={props.minDate} onChange={(e)=>setInputValue(e.target.value)}/>
        <span className='capitalize'>{props.label}</span>
    </div>
  )
}

export default DateInputField