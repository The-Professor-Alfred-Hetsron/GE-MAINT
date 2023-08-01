'use client'

import React from 'react'
import { FaRegEdit } from "react-icons/fa";

function UpdateBtn(props) {
  return (
    <button onClick={()=>props.updateAction()} className='group px-4 py-2 justify-center items-center gap-2 inline-flex rounded-lg bg-white text-[#149FDA] border border-sky-500 hover:bg-[#149FDA] hover:text-white'>
        <FaRegEdit size={20}/>
        <span className='text-[16px] font-semibold'>Modifier</span>
    </button>
  )
}

export default UpdateBtn