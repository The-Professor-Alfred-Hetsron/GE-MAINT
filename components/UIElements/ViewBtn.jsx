'use client'

import React from "react"
import { AiFillEye } from "react-icons/ai"
import { useRouter } from 'next/navigation'

function ViewBtn(props) {
    const router = useRouter()

    return (
        <button onClick={()=>router.push(props.href)} className='group px-4 py-2 justify-center items-center gap-2 inline-flex rounded-lg bg-white text-[#149FDA] border border-sky-500 hover:bg-[#149FDA] hover:text-white'>
            <AiFillEye size={20}/>
            <span className='text-[16px] font-semibold'>{props.viewText}</span>
        </button>
    )
}

export default ViewBtn