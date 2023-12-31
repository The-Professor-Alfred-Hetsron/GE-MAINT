'use client'

import React, {useState, useEffect} from 'react'
import '@/styles/formElements.css'

function TextAreaField(props) {
    const [inputValue, setInputValue] = useState(props.defaultValue?props.defaultValue:"")

    const handleChange = (value) => {
      if(value!=inputValue){
          setInputValue(value)
          props.setNewValue(value)
      }
    }

  return (
    <textarea rows="4" cols="50" value={inputValue} required placeholder={props.label} onChange={(e)=>handleChange(e.target.value)} className='w-full p-2 border border-[#0B5DA7] placeholder:text-[#0B5DA7] focus:border-[#4285F4] valid:border-[#4285F4] focus:placeholder:text-[#4285F4] bg-stone-50 text-black rounded-[5px] outline-none'>
      {inputValue}
    </textarea>
  )
}

export default TextAreaField