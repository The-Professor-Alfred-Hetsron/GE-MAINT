'use client'

import React, {useState, useEffect} from 'react'
import '@/styles/formElements.css'

function DropDownField(props) {
    const [inputValue, setInputValue] = useState(props.defaultValue?props.defaultValue:"")

    useEffect(()=> {
        props.setNewValue(`${inputValue}`)
    },[inputValue, props])

  return (
    <div className="inputBox">
        <select id="countries" className="custom-dropdown" onChange={(e)=>setInputValue(e.target.value)}>
            {props.placeholder && <option value="" disabled selected hidden ><span className='text-[#0B5DA7]'>{props.placeholder}</span></option>}
            {props.defaultValue && <option value="" disabled selected hidden>{props.defaultValue}</option>}
            {props.optionList?.map((option, index) =>{
                return <option 
                            key={index}
                            value={option}
                            className='py-4 px-5 text-base h-4'
                        >
                            {option}
                        </option>
            })}
        </select>
        <span className='capitalize'>{props.label}</span>
    </div>
  )
}

export default DropDownField