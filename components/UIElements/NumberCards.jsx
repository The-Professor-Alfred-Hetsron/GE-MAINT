'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


function NumberCards(props) {
const router = useRouter()
const totalInfo = props.info
  return (
    <button onClick={()=>router.push(totalInfo.href)} className='w-[250px] h-[250px] group flex flex-col px-2 py-2 bg-white hover:bg-sky-500 rounded-2xl shadow border border-slate-300 justify-center items-center'>
        <span className='text-center text-black text-[17px] font-semibold group-hover:text-white'>
            {totalInfo.name}
        </span>
        <div className='w-full flex flex-col justify-center items-center'>
            <Image src={totalInfo.image} alt={totalInfo.name} width={100} height={100} className='aspect-square'/>
            <span className='text-sky-500 text-[64px] font-semibold group-hover:text-white'>
                {totalInfo.total}
            </span>
        </div>
    </button>
  )
}

export default NumberCards