'use client'

import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";

function AddBtn(props) {
  return (
    <button onClick={() => props.addFunction()} type="submit" style={{width:props.width}} className="h-full text-white uppercase p-2 bg-sky-700 rounded-md justify-evenly items-center gap-2 inline-flex">
        <AiOutlinePlus size={32}/>
        <span className='w-full text-center text-base font-medium leading-snug tracking-[3px]'>{props.placeholder}</span>
    </button>
  )
}

export default AddBtn