'use client'

import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";

function DeleteBtn(props) {
  return (
    <button onClick={()=>props.deleteAction()} className='group px-4 py-2 justify-center items-center gap-2 inline-flex rounded-lg bg-white border border-red-500 text-[#EA4335] hover:bg-[#EA4335] hover:border-none hover:text-white'>
        <RiDeleteBin6Line size={20}/>
        <span className='text-[16px] font-semibold'>Supprimer</span>
    </button>
  )
}

export default DeleteBtn