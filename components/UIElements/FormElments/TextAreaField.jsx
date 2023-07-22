'use client'

import React, {useState, useEffect} from 'react'
import '@/styles/formElements.css'

function TextAreaField(props) {
    const [inputValue, setInputValue] = useState("")

    useEffect(()=> {
        props.setNewValue(inputValue.trimEnd())
    },[inputValue, props])

  return (
    <textarea rows="4" cols="50" required placeholder={props.label} onChange={(e)=>setInputValue(e.target.value.trimEnd())} className='w-full p-2 border border-[#0B5DA7] placeholder:text-[#0B5DA7] focus:border-[#4285F4] valid:border-[#4285F4] focus:placeholder:text-[#4285F4] bg-stone-50 text-black rounded-[5px] outline-none'>
      {props.defaultValue}
    </textarea>
  )
}

export default TextAreaField