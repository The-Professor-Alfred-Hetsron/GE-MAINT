'use client'

import React from 'react'
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation'
import { RiDeleteBin6Line } from "react-icons/ri";

function EquipmentCard(props) {
  const router = useRouter()
  const pathname = usePathname()
  const equipmentInfo = props.equipmentInfo? props.equipmentInfo : {}

  const routeToDetails = () => {
    router.push(`${pathname}/${equipmentInfo.nom}`)
  }

  return (
    <div className='w-[300px] bg-white rounded-[16px] shadow flex-col justify-start items-start inline-flex'>
      <button onClick={()=>routeToDetails()} className='w-full h-[200px] bg-[#D0E5F0] rounded-t-[16px] flex justify-center items-center'>
        <Image className="w-3/4 h-full" width="500" height="500" src={equipmentInfo.image} alt={equipmentInfo.nom}/>
      </button>
      <div className='text-black w-full px-[11.45px] py-[8.58px] flex-row justify-center items-center inline-flex'>
          <button onClick={()=>routeToDetails()} className='w-full flex-col justify-start items-start gap-[3px] inline-flex'>
            <span className='text-base font-semibold'>{equipmentInfo.nom}</span>
            <span className='text-xs font-normal'>{equipmentInfo.code}</span>
            <span className='text-xs font-normal'>{equipmentInfo.sousSystem} Sous systèmes</span>
          </button>
          <div className='flex justify-center items-center'>
            <button onClick={()=>props.deleteEquip()}>
              <RiDeleteBin6Line size={24} color='#EA4335'/>
            </button>
          </div>
      </div>
    </div>
  )
}

export default EquipmentCard